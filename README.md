# Sistema de Gestão de Cadastros

![CRUD Operations](https://img.shields.io/badge/CRUD-Full%20Implementation-blue)
![Design Patterns](https://img.shields.io/badge/Patterns-GRASP%20%26%20GoF-brightgreen)

## 📌 Propósito do Sistema

O sistema de **Gestão de Cadastros** foi desenvolvido para:
- Facilitar a administração de entidades (produtos e empregados)
- Implementar operações CRUD de forma organizada
- Aplicar padrões GRASP e GoF como estudo de boas práticas

## 🚀 Principais Funcionalidades

### 📦 Cadastro de Produtos
| Operação       | Descrição                                  | Validações                  |
|----------------|-------------------------------------------|-----------------------------|
| Criação        | Adiciona novos produtos                   | Nome obrigatório, preço > 0 |
| Consulta       | Busca por ID                              | -                           |
| Atualização    | Edita informações existentes              | Mantém validações           |
| Exclusão       | Remove permanentemente                    | -                           |

### 👥 Cadastro de Empregados
| Operação       | Características                           |
|----------------|------------------------------------------|
| Criação        | Notificação em tempo real via Observer   |
| Consulta       | Busca por ID numérico                    |
| Auditoria      | Log de operações com Decorator           |

## 👨‍💻 Principais Usuários

| Perfil            | Interação Típica                                                                 |
|-------------------|---------------------------------------------------------------------------------|
| Administradores   | Gerenciamento completo de cadastros                                             |
| Funcionários      | Consulta de informações (dependendo de permissões)                              |
| Sistemas Externos | Recebem notificações via Observer (ex: integração com folha de pagamento)       |

## 🛠 Tecnologias e Padrões

### 🔧 Padrões GRASP
| Padrão         | Aplicação                                                                 | Benefício                           |
|----------------|--------------------------------------------------------------------------|-------------------------------------|
| **Creator**    | `ProdutoRepository` cria instâncias de `Produto`                         | Baixo acoplamento                   |
| **Expert**     | `Produto` valida seus próprios dados                                     | Organização lógica                  |
| **Controller** | `EmpregadoController` orquestra operações                                | Separação de preocupações           |
| **High Cohesion** | Classes com responsabilidades únicas                                   | Manutenibilidade                    |

### 🧩 Padrões GoF
| Padrão        | Implementação                          | Caso de Uso                          |
|--------------|---------------------------------------|--------------------------------------|
| **Repository** | `ProdutoRepository`                  | Abstração de persistência            |
| **Strategy** | `ValidadorProduto`                   | Validação flexível                   |
| **Observer** | `SistemaNotificacao`                 | Notificação de eventos               |
| **Decorator**| `EmpregadoServiceDecorator`          | Adição de logs sem modificar lógica  |

## 🏗 Estrutura do Projeto