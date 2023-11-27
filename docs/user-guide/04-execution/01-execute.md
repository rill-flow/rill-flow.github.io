---
sidebar_position: 1
---

# Executing Workflows

## Introduction

In Rill Flow, once a workflow is created, you receive a specific `descriptorid`, comprising three elements: business ID (businessId), DAG graph ID (featureId), and DAG graph alias (alias). With this `descriptorid`, you can submit and execute the workflow.

Workflow execution in Rill Flow is asynchronous. The system assigns a unique `execution_id` to each running workflow. Users can use this ID to track the workflow's running status and retrieve results upon completion.

## API Usage

To submit a workflow task, use the [/flow/submit.json](../07-api.md#executing-a-workflow) API.

## Trigger Functionality

Rill Flow abstracts the workflow trigger logic, supporting various triggering methods such as scheduled tasks and message queue triggers.

## Backend Submission

// TODO
