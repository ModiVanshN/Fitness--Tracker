import cv2
import mediapipe as mp
import numpy as np
import time

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Function to calculate angles
def calculate_angle(a, b, c):
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

def start_fitness_tracking():
    cap = cv2.VideoCapture(0)
    counter = 0
    stage = None
    dir = 0
    count = 0
    pTime = 0

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
            
            try:
                landmarks = results.pose_landmarks.landmark

                # Get landmark positions
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                
                # Calculate angle
                angle = calculate_angle(shoulder, elbow, wrist)
                
                # Check for the dumbbell curls
                per = np.interp(angle, (30, 160), (0, 100))
                bar = np.interp(angle, (30, 160), (650, 100))
                color = (255, 0, 255)
                if per == 100:
                    color = (0, 255, 0)
                    if dir == 0:
                        count += 0.5
                        dir = 1
                if per == 0:
                    color = (0, 255, 0)
                    if dir == 1:
                        count += 0.5
                        dir = 0
                print(count)
                
                # Draw Bar
                cv2.rectangle(image, (1100, 100), (1175, 650), color, 3)
                cv2.rectangle(image, (1100, int(bar)), (1175, 650), color, cv2.FILLED)
                cv2.putText(image, f'{int(per)} %', (1100, 75), cv2.FONT_HERSHEY_PLAIN, 4, color, 4)

                # Draw Curl Count
                cv2.rectangle(image, (0, 450), (250, 720), (0, 255, 0), cv2.FILLED)
                cv2.putText(image, str(int(count)), (45, 670), cv2.FONT_HERSHEY_PLAIN, 15, (255, 0, 0), 25)
                
            except Exception as e:
                print("Error:", e)

            # Draw landmarks
            mp_drawing.draw_landmarks(image, results.pose_landmarks, 
                                       mp_pose.POSE_CONNECTIONS,
                                       mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2))

            # Calculate FPS
            cTime = time.time()
            fps = 1 / (cTime - pTime)
            pTime = cTime
            cv2.putText(image, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

            cv2.imshow('Mediapipe Feed', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()