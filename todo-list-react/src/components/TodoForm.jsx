import React from "react"
import styled from "styled-components"
import { useThemeContext } from "../context/themeProvider"
import { v4 as uuid } from "uuid"

const TodoForm = ({
	inputTitle,
	setInputTitle,
	inputDescription,
	setInputDescription,
	todoItems,
	setTodoItems,
	setTodoStatus,
}) => {
	const theme = useThemeContext()

	// Using the UUID package to generate a unique identifier for each todo item
	const id = uuid()

	// Handle user input in the title field
	const handleInputTitleChange = (e) => {
		setInputTitle(e.target.value)

		if (e.target.value.length >= 25) {
			alert("Title cannot be more than 20 characters")
		}
	}

	// Handle user input in the description field
	const handleInputDescriptionChange = (e) => {
		setInputDescription(e.target.value)

		if (e.target.value.length >= 75) {
			alert("Description cannot be more than 75 characters")
		}
	}

	// Hangle todo add button
	const addTodoItem = (e) => {
		if (
			inputTitle === "" ||
			inputDescription === "" ||
			inputTitle.length <= 4 ||
			inputDescription.length <= 15
		) {
			return alert("Invalid title or description! Please try again.")
		} else {
			e.preventDefault()
			setTodoItems([
				...todoItems,
				{
					title: inputTitle,
					description: inputDescription,
					completed: false,
					id: id,
				},
			])
			setInputTitle("")
			setInputDescription("")
		}
	}

	// Handle todo status
	const changeTodoItemStatus = (e) => {
		setTodoStatus(e.target.value)
	}

	return (
		<FormWrapper>
			<MainForm>
				<TodoTitle
					value={inputTitle}
					placeholder="Enter a todo item"
					minLength={4}
					maxLength={20}
					onChange={handleInputTitleChange}
					required={true}
				/>
				<TodoDescription
					value={inputDescription}
					placeholder="Enter a description"
					minLength={15}
					maxLength={75}
					onChange={handleInputDescriptionChange}
					required={true}
				/>
				<AddButton theme={theme} onClick={addTodoItem}>
					Add Item
				</AddButton>
			</MainForm>
			<TodoFilter onChange={changeTodoItemStatus}>
				<FilterOption value="all">All</FilterOption>
				<FilterOption value="pending">Pending</FilterOption>
				<FilterOption value="completed">Completed</FilterOption>
			</TodoFilter>
		</FormWrapper>
	)
}

const FormWrapper = styled.form`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 2rem 0;
`

const MainForm = styled.div`
	width: 75%;
	display: flex;
	justify-content: space-between;
`

const TodoTitle = styled.input`
	width: 25%;
	padding: 0 1rem;
	border: none;
	border-radius: 1rem;
	transition: 0.25s ease-in-out;

	&:focus {
		opacity: 0.75;
	}
`

const TodoDescription = styled.input`
	width: 60%;
	padding: 0 1rem;
	border: none;
	border-radius: 1rem;
	transition: 0.25s ease-in-out;

	&:focus {
		opacity: 0.75;
	}
`

const AddButton = styled.button`
	border: none;
	border-radius: 1rem;
	padding: 1rem;
	background-color: ${(props) => props.theme.addButtonColor};
	color: ${(props) => props.theme.headerColor};
	transition: 0.25s ease-in-out;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`

const TodoFilter = styled.select`
	border: none;
	border-radius: 1rem;
	padding: 0 1rem;
	cursor: pointer;
`

const FilterOption = styled.option``

export default TodoForm
