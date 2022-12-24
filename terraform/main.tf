provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "devops_project" {
  name     = "${var.prefix}-k8s-resources"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "main_cluster" {
  name                = "${var.prefix}-k8s"
  location            = azurerm_resource_group.devops_project.location
  resource_group_name = azurerm_resource_group.devops_project.name
  dns_prefix          = "${var.prefix}-k8s"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}