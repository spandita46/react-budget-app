import { Button, Form, Modal } from "react-bootstrap";
import React, { useRef } from "react";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    let newExpense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    };
    addExpense(newExpense);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.01}
              ref={amountRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option
                key={UNCATEGORISED_BUDGET_ID}
                value={UNCATEGORISED_BUDGET_ID}
              >
                Uncategorized
              </option>
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
