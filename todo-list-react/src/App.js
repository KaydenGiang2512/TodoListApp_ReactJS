import { useState, useEffect } from "react"
import styled from "styled-components"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { useThemeContext } from "./context/themeProvider"

function App() {
	const theme = useThemeContext()

	const [inputTitle, setInputTitle] = useState("")
	const [inputDescription, setInputDescription] = useState("")
	const [todoItems, setTodoItems] = useState([])
	const [todoStatus, setTodoStatus] = useState("all")
	const [filteredTodoItems, setFilteredTodoItems] = useState([])

	// Creating a use effect that will run the filter function whenever the a new todo is added, then save the todo list to local storage
	useEffect(() => {
		getTodosFromLocalStorage()
	}, [])

	useEffect(() => {
		filterByStatus()
		saveTodosToLocalStorage()
	}, [todoItems, todoStatus])

	const filterByStatus = () => {
		switch (todoStatus) {
			case "pending":
				setFilteredTodoItems(
					todoItems.filter((todoItem) => todoItem.completed === false)
				)
				break
			case "completed":
				setFilteredTodoItems(
					todoItems.filter((todoItem) => todoItem.completed === true)
				)
				break
			default:
				setFilteredTodoItems(todoItems)
				break
		}
	}

	const saveTodosToLocalStorage = () => {
		if (todoItems.length > 0) {
			localStorage.setItem("todoItems", JSON.stringify(todoItems))
		}
	}

	const getTodosFromLocalStorage = () => {
		if (localStorage.getItem("todoItems") === null) {
			localStorage.setItem("todoItems", JSON.stringify([]))
		} else {
			let todoListfromLocalStorage = JSON.parse(
				localStorage.getItem("todoItems")
			)
			setTodoItems(todoListfromLocalStorage)
		}
	}

	return (
		<Wrapper theme={theme}>
			<Header theme={theme}>Get organized with Kayden's Todo App!</Header>
			<TodoContainer theme={theme}>
				<TodoForm
					inputTitle={inputTitle}
					setInputTitle={setInputTitle}
					inputDescription={inputDescription}
					setInputDescription={setInputDescription}
					todoItems={todoItems}
					setTodoItems={setTodoItems}
					setTodoStatus={setTodoStatus}
				/>
				<TodoList
					todoItems={todoItems}
					setTodoItems={setTodoItems}
					filteredTodoItems={filteredTodoItems}
				/>
			</TodoContainer>
		</Wrapper>
	)
}

const Wrapper = styled.main`
	min-height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 2rem 0;
	background: ${(props) => props.theme.backgroundColor};
`

const TodoContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
`

const Header = styled.h1`
	font-size: 3rem;
	text-align: center;
	color: ${(props) => props.theme.headerColor};
`

export default App
