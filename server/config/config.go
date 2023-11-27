package config

import (
	"log"

	"github.com/spf13/viper"
)

var C Config

type Config struct {
	FireBaseURL    string `mapstructure:"FIRE_BASE_URL"`
	ServerKey      string `mapstructure:"FIRE_BASE_SERVER_KEY"`
	DeviceToken    string `mapstructure:"FIRE_BASE_DEVICE_TOKEN"`
	CredentialPath string `mapstructure:"CREDENTIALS_PATH"`
}

func init() {
	v := viper.New()

	v.SetConfigFile(".env")

	v.AddConfigPath(".")

	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		log.Fatalf("failed to read env, error: %v", err)
	}

	if err := v.Unmarshal(&C); err != nil {
		log.Fatalf("failed to unmarshal env, error: %v", err)
	}
}

func GetConfig() *Config {
	return &C
}
