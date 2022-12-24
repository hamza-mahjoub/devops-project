variable "prefix" {
  description = "A prefix used for all resources in this example"
  type = string
  default = "DevOps-Project"
}

variable "location" {
  description = "The Azure Region in which all resources in this example should be provisioned"
  type = string
  default = "westeurope"
}