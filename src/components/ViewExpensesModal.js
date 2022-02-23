import { Button, Modal, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import React from "react";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const isUncategorisedBudget = UNCATEGORISED_BUDGET_ID === budgetId;

  const budget = isUncategorisedBudget
    ? { name: "Uncategorized", id: UNCATEGORISED_BUDGET_ID }
    : budgets.find((budget) => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {!isUncategorisedBudget && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => {
            return (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className=" fs-5">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteExpense(expense)}
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
