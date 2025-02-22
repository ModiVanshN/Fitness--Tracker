from flask import Flask, render_template, Response, url_for
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__, static_folder='static')

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

counting = False

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

def generate_frames():
    global counting, counter
    cap = cv2.VideoCapture(0)
    counter = 0 
    stage = None

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            if counting:
                try:
                    landmarks = results.pose_landmarks.landmark
                    
                    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, 
                                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, 
                                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, 
                                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                    
                    right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, 
                                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, 
                                   landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                    right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, 
                                   landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                    
                    # Add skeleton overlay
                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

                    left_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
                    right_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)

                    avg_angle = (left_angle + right_angle) / 2

                    if avg_angle > 160:
                        stage = "down"
                    if avg_angle < 80 and stage == 'down':
                        stage = "up"
                        counter += 1
                        print(counter)
                                
                except Exception as e:
                    print("Error:", e)
            
            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start_counting')
def start_counting():
    global counting
    counting = True
    return '', 204

@app.route('/stop_counting')
def stop_counting():
    global counting
    counting = False
    return '', 204

@app.route('/get_count')
def get_count():
    global counter
    return {'count': counter}

@app.route('/reset_count')
def reset_count():
    global counter
    counter = 0
    return '', 204

if __name__ == "__main__":
    app.run(debug=True, port=5000)
