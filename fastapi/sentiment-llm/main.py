from fastapi import FastAPI
from src.agent.router import agent_router


app = FastAPI()
app.include_router(agent_router)

