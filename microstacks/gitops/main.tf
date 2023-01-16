data "terraform_remote_state" "aks" {
  backend = "azurerm"

  config = {
    resource_group_name  = "GlobalRG"
    container_name       = "devopsproject"
    storage_account_name = "gdevopsprojectl"
    key                  = "infra-stack.json"
  }
}



resource "kubernetes_namespace" "gitops_namespace" {
  metadata {
    labels = {
      environment = var.environment
    }
    name = var.namespace
  }
}


resource "helm_release" "argo" {
  name       = "argo-cd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = kubernetes_namespace.gitops_namespace.id
}



resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = kubernetes_namespace.gitops_namespace.id
}

resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  namespace  = kubernetes_namespace.gitops_namespace.id
}

resource "helm_release" "signoz" {
  name       = "signoz"
  repository = "https://charts.signoz.io"
  chart      = "signoz"
  namespace  = kubernetes_namespace.gitops_namespace.id
}

resource "helm_release" "node_exporter" {
  name       = "node-exporter"
  repository = " https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus-node-exporter"
  namespace  = kubernetes_namespace.gitops_namespace.id
}