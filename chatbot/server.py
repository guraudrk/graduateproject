import os

import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.models import load_model

from chatbot import add_dane_suffix  # 전처리 함수; chatbot.py에서의 함수/변수들을 불러온다.
from chatbot import generate_response  # chatbot.py에서 정의한 것
from chatbot import (find_similar_answer, organized_data, replace_words,
                     tokenizer, vectorizer, word_map)

#이 파일을 실행시키면 chatbot.py파일도 실행이 되는 격이다.
#그러니 이 파일만 실행시키자. 경로 잘 맞춰서 실행시키기! 꼭!

app = Flask(__name__)
CORS(app)

# 현재 파일의 절대 경로를 가져온다.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# 절대 경로로 모델 파일 경로를 설정한다.
model_path = os.path.join(BASE_DIR, 'chatbot_model.keras')
print(model_path)
# 모델 로드 (서버 시작 시 한 번만 실행)
model = load_model(model_path)

# 챗봇 로직
def generate_response(question):
    # 유사한 답변을 찾는다
    answer = find_similar_answer(question, organized_data, vectorizer, model, tokenizer)
    
    # 답변을 변환한다
    transformed_answer = replace_words(answer, word_map)
    
    # 최종 답변을 변환하고 반환한다
    final_answer = add_dane_suffix(transformed_answer)
    
    return final_answer

# POST 요청을 처리한다
@app.route('/aikingsejong', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    print(f"Received user input: {user_input}")  # 로그 추가
    response = generate_response(user_input)
    print(f"Generated response: {response}")  # 로그 추가

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)