terraform {
  required_version = "~>1.3.4"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.31.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "GlobalRG"
    container_name       = "devopsproject"
    storage_account_name = "gdevopsprojectl"
    key                  = "infra-stack.json"
  }

}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}