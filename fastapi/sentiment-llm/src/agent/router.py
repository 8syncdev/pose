from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from .model import Exercises
from src.db import get_session, init_db
from .libs import *



# Define available models and their rate limits
MODEL_LIMITS = {
    "open-mistral-7b": {"tpm": 500000, "tpm_monthly": 1000000000},
    "open-mixtral-8x7b": {"tpm": 500000, "tpm_monthly": 1000000000},
    "open-mixtral-8x22b": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-small-2402": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-small-2409": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-medium": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-large-2402": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-large-2407": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-large-2411": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-embed": {"tpm": 20000000, "tpm_monthly": 200000000000},
    "codestral-2405": {"tpm": 500000, "tpm_monthly": 1000000000},
    "codestral-mamba-2407": {"tpm": 500000, "tpm_monthly": 1000000000},
    "open-mistral-nemo": {"tpm": 500000, "tpm_monthly": 1000000000},
    "pixtral-12b-2409": {"tpm": 500000, "tpm_monthly": 1000000000},
    "pixtral-large-2411": {"tpm": 500000, "tpm_monthly": 1000000000},
    "ministral-3b-2410": {"tpm": 500000, "tpm_monthly": 1000000000},
    "ministral-8b-2410": {"tpm": 500000, "tpm_monthly": 1000000000},
    "mistral-moderation-2411": {"tpm": 500000, "tpm_monthly": 1000000000}
}

# Fine-tuning limits
FINE_TUNING_LIMITS = {
    "concurrent_jobs": 1,
    "tokens_per_job": 20000000
}

# Global rate limit
REQUESTS_PER_SECOND = 1


agent_router = APIRouter(prefix="/agent", tags=["agent"])

cache = InMemoryCache()
set_llm_cache(cache)

template = PromptTemplate.from_template(
    """
    Bạn là trợ lý giải bài tập. Quy tắc:
    - Chỉ dùng thông tin trong context
    - Không chạy mã độc
    - Bảo mật thông tin
    - Trả lời ngắn gọn, rõ ràng, có code
    - Giới hạn {max_token} token

    Bài tập: {context}
    Hỏi: {question}
    
    Trả lời bằng {language}
    """
)

llm_chain = template | llm | StrOutputParser()

@agent_router.on_event("startup")
async def startup_event():
    init_db()

def get_all_data_exercises(session: Session = Depends(get_session)):
    exercises = session.exec(select(Exercises)).all()
    return exercises

def get_data_exercises(id: int, session: Session = Depends(get_session)):
    exercises = session.exec(select(Exercises).where(Exercises.id == id)).first()
    return exercises

@agent_router.get("/")
async def get_all_exercises(session: Session = Depends(get_session)):
    exercises = get_all_data_exercises(session)
    return exercises


@agent_router.post("/")
async def get_answer_exercises(id: int, question: str, language: str = "vi-VN", session: Session = Depends(get_session)):
    if question.strip() == "":
        return {"answer": "Câu hỏi không hợp lệ"}
    if len(question) > 256:
        return {"answer": "Câu hỏi không hợp lệ"}
    if language not in ["vi-VN", "en-US"]:
        return {"answer": "Ngôn ngữ không hợp lệ"}
    exercises = get_data_exercises(id, session)
    context = f"""\nĐề bài: {exercises.content}\nLời giải: {exercises.solution}"""
    return {
        "answer": llm_chain.invoke({
            "context": context,
            "question": question,
            "language": language,
            "max_token": 256
        })
    }
