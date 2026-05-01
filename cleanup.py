import os
import shutil

wrong_path = "/home/danhomelab/IT/app/products/\\[id\\]"
if os.path.exists(wrong_path):
    shutil.rmtree(wrong_path)
    print(f"Removed: {wrong_path}")
else:
    print("Path not found")

# Check remaining
correct_path = "/home/danhomelab/IT/app/products/[id]"
print(f"Correct path exists: {os.path.exists(correct_path)}")
if os.path.exists(correct_path):
    print(f"Files in [id]: {os.listdir(correct_path)}")
