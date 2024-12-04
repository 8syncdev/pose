INSERT INTO "exercises" (lesson_id, category_id, name, level, content, solution, points, function_name, param_style, test_cases, content_visibility, solution_visibility) VALUES 
(1, 1, 'Tổng Hai Số', 'Easy', '# Tổng Hai Số
Viết một hàm nhận vào hai số nguyên và trả về tổng của chúng.

## Đầu vào
- a: số nguyên thứ nhất
- b: số nguyên thứ hai

## Đầu ra
- Tổng của hai số

## Ví dụ
```python
print(solve(2, 3))  # 5
print(solve(-1, 1))  # 0
print(solve(10, 20))  # 30
```', '# Giải pháp
```python
def solve(a, b):
    return a + b
```

## Giải thích
1. Hàm nhận vào hai tham số a và b
2. Sử dụng toán tử + để tính tổng
3. Trả về kết quả tổng của a và b', 10, 'solve', 'args', '[{"input": "2, 3", "expected": "5", "description": "Số dương"}, {"input": "-1, 1", "expected": "0", "description": "Số âm và dương"}, {"input": "10, 20", "expected": "30", "description": "Số lớn"}]', 'public', 'public'),

(1, 1, 'Tìm Số Lớn Nhất', 'Easy', '# Tìm Số Lớn Nhất
Viết một hàm nhận vào hai số nguyên và trả về số lớn nhất.

## Đầu vào
- a: số nguyên thứ nhất
- b: số nguyên thứ hai

## Đầu ra
- Số lớn nhất trong hai số

## Ví dụ
```python
print(solve(2, 3))  # 3
print(solve(-1, 1))  # 1
print(solve(10, 5))  # 10
```', '# Giải pháp
```python
def solve(a, b):
    return max(a, b)
```

## Giải thích
1. Hàm nhận vào hai tham số a và b
2. Sử dụng hàm max() để tìm số lớn nhất
3. Trả về số lớn nhất giữa a và b', 15, 'solve', 'args', '[{"input": "2, 3", "expected": "3", "description": "Số dương"}, {"input": "-1, 1", "expected": "1", "description": "Số âm và dương"}, {"input": "10, 5", "expected": "10", "description": "Số lớn"}]', 'public', 'public'),

(1, 1, 'Kiểm Tra Số Chẵn', 'Easy', '# Kiểm Tra Số Chẵn
Viết một hàm nhận vào một số nguyên và kiểm tra xem số đó có phải là số chẵn hay không.

## Đầu vào
- n: số nguyên cần kiểm tra

## Đầu ra
- True nếu n là số chẵn, False nếu n là số lẻ

## Ví dụ
```python
print(solve(2))  # True
print(solve(3))  # False
print(solve(0))  # True
```', '# Giải pháp
```python
def solve(n):
    return n % 2 == 0
```

## Giải thích
1. Hàm nhận vào một tham số n
2. Sử dụng toán tử chia lấy dư % với 2
3. Trả về True nếu chia hết cho 2, False nếu không', 20, 'solve', 'args', '[{"input": "2", "expected": "True", "description": "Số chẵn dương"}, {"input": "3", "expected": "False", "description": "Số lẻ"}, {"input": "0", "expected": "True", "description": "Số 0"}]', 'public', 'public');





