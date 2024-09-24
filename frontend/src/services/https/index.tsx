import axios from 'axios';

// Base URL for the API
const apiUrl = "http://localhost:8000";

// Option to include token in headers
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

// Function to create a refund request
async function CreateRefund(data: { refund_amount: number; }) {
  return await axios
    .post(`${apiUrl}/refund`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to get all refund requests
async function GetRefundRequests() {
  return await axios
    .get(`${apiUrl}/refund-requests`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to get a specific refund request by ID
async function GetRefundRequestById(id: string) {
  return await axios
    .get(`${apiUrl}/refund-request/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to update a refund request by ID
async function UpdateRefundRequestById(id: string, data: { refund_amount?: number; }) {
  return await axios
    .put(`${apiUrl}/refund-request/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to delete a refund request by ID
async function DeleteRefundRequestById(id: string) {
  return await axios
    .delete(`${apiUrl}/refund-request/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to approve a refund
async function ApproveRefund(data: { refund_id: number; approval_status: boolean; }) {
  return await axios
    .post(`${apiUrl}/approve-refund`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to get all approval requests
async function GetApprovalRequests() {
  return await axios
    .get(`${apiUrl}/approval-requests`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to get a specific approval request by ID
async function GetApprovalRequestById(id: string) {
  return await axios
    .get(`${apiUrl}/approval-request/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to update an approval request by ID
async function UpdateApprovalRequestById(id: string, data: { approval_status?: boolean; }) {
  return await axios
    .put(`${apiUrl}/approval-request/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Function to delete an approval request by ID
async function DeleteApprovalRequestById(id: string) {
  return await axios
    .delete(`${apiUrl}/approval-request/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  CreateRefund,
  GetRefundRequests,
  GetRefundRequestById,
  UpdateRefundRequestById,
  DeleteRefundRequestById,
  ApproveRefund,
  GetApprovalRequests,
  GetApprovalRequestById,
  UpdateApprovalRequestById,
  DeleteApprovalRequestById,
};
