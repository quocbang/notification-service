package cmd

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"github.com/brianvoe/gofakeit/v6"
	"google.golang.org/api/option"

	"githhub.com/quocbang/notification-serrvice/server/config"
)

func Run() {
	cfg := config.GetConfig()

	// Create a message payload
	message := map[string]interface{}{
		// "to": cfg.DeviceToken, // Replace with the device token or topic
		"token":            cfg.DeviceToken,
		"registration_ids": []string{cfg.DeviceToken},
		"notification": map[string]string{
			"title": gofakeit.BookTitle(),
			"body":  gofakeit.AchAccount(),
		},
	}

	body, err := json.Marshal(message)
	if err != nil {
		log.Fatalf("failed to marshal message, error: %v", err)
	}

	req, err := http.NewRequest(http.MethodPost, "https://fcm.googleapis.com/fcm/send", bytes.NewBuffer(body))
	if err != nil {
		log.Fatalf("failed to create new request, error: %v", err)
	}
	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "key="+cfg.ServerKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatalf("failed to do request, error: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		respBody, err := json.Marshal(req.Body)
		if err != nil {
			log.Fatalf("failed to marshal response body, error: %v", err)
		}
		log.Fatalf("response an ERROR, code: %d, payload: %s", resp.StatusCode, string(respBody))
	}

	var payload interface{}
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		log.Fatalf("failed to decode body, error: %v", err)
	}

	log.Printf("Request Success with payload: %v and status code: %d", payload, resp.StatusCode)
}

func RunWithFirebasePackage() {
	cfg := config.GetConfig()

	data, err := os.ReadFile("./notification-service-tes-b61d1-firebase-adminsdk-31miw-044a59e1fb.json")
	if err != nil {
		log.Fatalf("failed to read json file, error: %v", err)
	}

	opts := []option.ClientOption{option.WithCredentialsJSON(data)}

	app, err := firebase.NewApp(context.Background(), nil, opts...)
	if err != nil {
		log.Fatalf("new firebase app: %s", err)
	}

	fcmClient, err := app.Messaging(context.Background())
	if err != nil {
		log.Fatalf("messaging: %s", err)
	}

	result, err := fcmClient.Send(context.Background(), &messaging.Message{
		Token: cfg.DeviceToken,
		Data: map[string]string{
			"title": "Notification",
			"body":  "Notification",
		},
	})
	if err != nil {
		log.Fatalf("failed to send message, error: %v", err)
	}

	log.Printf("sent message successfully, response: %s \n", result)
}
