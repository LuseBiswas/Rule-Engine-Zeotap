# Rule Engine with AST

## Objective
Develop a simple 3-tier rule engine application (Simple UI, API, and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend, etc. The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic creation, combination, and modification of these rules.

## Data Structure
Define a data structure to represent the AST. The structure should allow rule changes. One possible data structure could be a Node with the following fields:
- `type`: String indicating the node type ("operator" for AND/OR, "operand" for conditions)
- `left`: Reference to another Node (left child)
- `right`: Reference to another Node (right child for operators)
- `value`: Optional value for operand nodes (e.g., number for comparisons)

## Data Storage
Use MongoDB for storing the rules and application metadata. Define the schema with sample data.

### Sample Rules
1. `rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"`
2. `rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"`

## API Design
1. `create_rule(rule_string)`: This function takes a string representing a rule (as shown in the examples) and returns a Node object representing the corresponding AST.
2. `combine_rules(rules)`: This function takes a list of rule strings and combines them into a single AST. It should consider efficiency and minimize redundant checks. The function should return the root node of the combined AST.
3. `evaluate_rule(JSON data)`: This function takes a JSON representing the combined rule's AST and a dictionary data containing attributes (e.g., `data = {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`). The function should evaluate the rule against the provided data and return True if the user is of that cohort based on the rule, False otherwise.

## Test Cases
1. Create individual rules from the examples using `create_rule` and verify their AST representation.
2. Combine the example rules using `combine_rules` and ensure the resulting AST reflects the combined logic.
3. Implement sample JSON data and test `evaluate_rule` for different scenarios.
4. Explore combining additional rules and test the functionality.

## Bonus
- Implement error handling for invalid rule strings or data formats (e.g., missing operators, invalid comparisons).
- Implement validations for attributes to be part of a catalog.
- Allow for modification of existing rules using additional functionalities within `create_rule` or separate functions. This could involve changing operators, operand values, or adding/removing sub-expressions within the AST.
- Consider extending the system to support user-defined functions within the rule language for advanced conditions (outside the scope of this exercise).

## Project Structure

### Backend (Node.js)
- **Folder: `rule-engine`**
  - `node_modules/`: Node.js modules.
  - `src/`
    - `config/`: Configuration files.
    - `controllers/`: API endpoint controllers.
    - `models/`: Database models.
    - `routes/`: API routes.
    - `utils/`: Utility functions.
    - `index.js`: Entry point for the backend.
  - `.env`: Environment variables.
  - `package.json`: Dependencies and scripts.
  - `package-lock.json`: Lock file for dependencies.

### Frontend (React, Vite, Tailwind CSS)
- **Folder: `rule-engine-frontend`**
  - `node_modules/`: Node.js modules.
  - `public/`: Static assets.
  - `src/`
    - `index.js`: Entry point for the frontend.
  - `.eslintrc.cjs`: ESLint configuration.
  - `.gitignore`: Git ignore file.
  - `index.html`: Main HTML file.
  - `package.json`: Dependencies and scripts.
  - `package-lock.json`: Lock file for dependencies.
  - `post.config.js`: PostCSS configuration.
  - `tailwind.config.js`: Tailwind CSS configuration.
  - `vite.config.js`: Vite configuration.
  - `README.md`: Project documentation (this file).

## Cloning the Repository

To clone the repository, follow these steps:

1. Open your terminal.
2. Run the following command to clone the repository:
   ```sh
   git clone <repository_url>
   ```
3. Navigate to the project directory:
   ```sh
   cd <repository_directory>
   ```

## Installation and Setup

### Backend
1. Navigate to the `rule-engine` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add necessary environment variables, including your database URL:
   ```plaintext
   HORA_DATABASE=<your_database_url>
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend
1. Navigate to the `rule-engine-frontend` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage
1. Open the frontend application in your browser.
2. Use the UI to create, combine, and evaluate rules.
3. The backend API will handle rule creation, combination, and evaluation.

## API Key Formats

### Evaluate Rule Key Format
To evaluate a rule in Postman, use the following JSON format:
```json
{
  "ruleId": "66a27c89dca01ec0a644901e",
  "data": {
    "age": 40,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
```

### Create Rule and Combine Rule Format
To create or combine a rule in Postman, use the following JSON format:
```json
{
  "rule_string": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
}
```

Make sure to install `node_modules` in both the frontend and backend directories by running `npm install` in each respective directory.
```

This README file now includes instructions to add the database URL in the `.env` file, along with the necessary steps for cloning the repository, setting up, and using the project.