import React from "react"
import styled from "styled-components"
import { useThemeContext } from "../context/themeProvider"

const TodoItem = ({
	title,
	description,
	todoItem,
	todoItems,
	setTodoItems,
}) => {
	const theme = useThemeContext()

	// Handle todo delete button
	const deleteTodoItem = () => {
		const updatedTodoList = setTodoItems(
			todoItems.filter((element) => element.id !== todoItem.id)
		)
		localStorage.setItem("todoItems", JSON.stringify(updatedTodoList))

		if (updatedTodoList === undefined) {
			localStorage.setItem("todoItems", JSON.stringify([]))
		}
	}

	// Handle todo complete button
	const completeTodoItem = () => {
		setTodoItems(
			todoItems.map((item) => {
				if (item.id === todoItem.id) {
					return {
						...item,
						completed: !item.completed,
					}
				}
				return item
			})
		)
	}

	return (
		<TodoWrapper>
			<Todo
				theme={theme}
				className={`${todoItem.completed ? "completed" : ""}`}>
				<TodoTitle>{title}</TodoTitle>
				<TodoDescription>{description}</TodoDescription>
			</Todo>
			<TodoButtons>
				<CompleteButton
					theme={theme}
					className={`${todoItem.completed ? "completed" : ""}`}
					onClick={completeTodoItem}>
					{todoItem.completed ? "Uncheck" : "Complete"}
				</CompleteButton>
				<DeleteButton theme={theme} onClick={deleteTodoItem}>
					Delete
				</DeleteButton>
			</TodoButtons>
		</TodoWrapper>
	)
}

const TodoWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem 0;
	margin: 2rem 0;
	transition: 0.25s ease-in-out;
`

const Todo = styled.li`
	width: 75%;
	padding: 1rem;
	border-radius: 1rem;
	background-color: ${(props) => props.theme.primaryColor};
	transition: 0.25s ease-in-out;

	&: hover {
		opacity: 0.5;
	}

	&.completed {
		opacity: 0.5;
		text-decoration: line-through;
		color: ${(props) => props.theme.headerColor};
		background-color: ${(props) => props.theme.completeColor};
		pointer-events: none;
	}

	&.deleted {
		transform: translateY(10rem) rotateZ(20deg);
		opacity: 0;
	}
`

const TodoTitle = styled.h1`
	font-size: 1.6rem;
	margin-bottom: 1rem;
`

const TodoDescription = styled.h2`
	font-size: 1rem;
	margin-top: 1rem;
`

const TodoButtons = styled.div`
	display: flex;
`

const CompleteButton = styled.button`
	padding: 0 1rem;
	border: none;
	border-radius: 1rem;
	color: ${(props) => props.theme.headerColor};
	background-color: ${(props) => props.theme.completeColor};
	transition: 0.25s ease-in-out;

	&: hover {
		opacity: 0.5;
	}

	&.completed {
		color: ${(props) => props.theme.darkHeaderColor};
		background-color: ${(props) => props.theme.primaryColor};
	}
`

const DeleteButton = styled.button`
	padding: 0 1rem;
	border: none;
	border-radius: 1rem;
	color: ${(props) => props.theme.headerColor};
	background-color: ${(props) => props.theme.deleteColor};
	transition: 0.25s ease-in-out;

	&: hover {
		opacity: 0.5;
	}

	.deleted {
		transform: translateY(10rem) rotateZ(20deg);
		opacity: 0;
	}
`

export default TodoItem
