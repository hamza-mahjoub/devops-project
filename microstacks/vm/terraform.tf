terraform {
  required_version = "~>1.3.4"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.31.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~>4.0.4"
    }
  }
}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}