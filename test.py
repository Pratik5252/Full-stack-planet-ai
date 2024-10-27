# test_llama_index.py
try:
    from llama_index.llm import LLamaIndex
    print("LLamaIndex imported successfully!")
except ImportError as e:
    print(f"Error importing LLamaIndex: {e}")
