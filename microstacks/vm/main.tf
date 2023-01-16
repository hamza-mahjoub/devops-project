resource "azurerm_resource_group" "dev" {
  name     = "${var.prefix}-resources"
  location = var.location
}


resource "azurerm_virtual_network" "vm_network" {
  name                = "${var.prefix}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.dev.location
  resource_group_name = azurerm_resource_group.dev.name
}


resource "azurerm_subnet" "vm_subnet" {
  name                 = "${var.prefix}-internal-network"
  resource_group_name  = azurerm_resource_group.dev.name
  virtual_network_name = azurerm_virtual_network.vm_network.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "vm_public_ip" {
  name                = "${var.prefix}-ip-address"
  resource_group_name = azurerm_resource_group.dev.name
  location            = azurerm_resource_group.dev.location
  allocation_method   = "Dynamic"
}

resource "azurerm_network_security_group" "vm_nsg" {
  name                = "myNetworkSecurityGroup"
  location            = azurerm_resource_group.dev.location
  resource_group_name = azurerm_resource_group.dev.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "vm_ni" {
  name                = "${var.prefix}-network-interface"
  location            = azurerm_resource_group.dev.location
  resource_group_name = azurerm_resource_group.dev.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.vm_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.vm_public_ip.id
  }
}

resource "azurerm_network_interface_security_group_association" "example" {
  network_interface_id      = azurerm_network_interface.vm_ni.id
  network_security_group_id = azurerm_network_security_group.vm_nsg.id
}

resource "tls_private_key" "new_key" {
  algorithm = "RSA"
}

resource "azurerm_linux_virtual_machine" "vm" {
  name                = "${var.prefix}-vm"
  resource_group_name = azurerm_resource_group.dev.name
  location            = azurerm_resource_group.dev.location
  size                = "Standard_F2"
  admin_username      = "ubuntu"
  network_interface_ids = [
    azurerm_network_interface.vm_ni.id,
  ]

  admin_ssh_key {
    username   = "ubuntu"
    public_key = tls_private_key.new_key.public_key_openssh
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = tls_private_key.new_key.private_key_openssh
    host        = self.public_ip_address
  }

  provisioner "remote-exec" {
        inline = [
          "bash -c \"sudo apt-get update\"",
          "bash -c \"sudo apt-get install docker.io -y\"",
        ]
    }

}