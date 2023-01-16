output "kube_config" {
  value     = azurerm_kubernetes_cluster.main_cluster.kube_config
  sensitive = true
}