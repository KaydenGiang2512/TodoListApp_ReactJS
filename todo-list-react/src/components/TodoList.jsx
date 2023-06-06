import React from "react"
import styled from "styled-components"
import TodoItem from "./TodoItem"

const TodoList = ({ todoItems, setTodoItems, filteredTodoItems }) => {
	return (
		<ListWrapper>
			<List>
				{filteredTodoItems.map((todoItem) => (
					<TodoItem
						title={todoItem.title}
						description={todoItem.description}
						todoItem={todoItem}
						completed={todoItem.completed}
						key={todoItem.id}
						todoItems={todoItems}
						setTodoItems={setTodoItems}
					/>
				))}
			</List>
		</ListWrapper>
	)
}

const ListWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem 0;
`

const List = styled.ul`
	width: 100%;
	list-style-type: none;
`

export default TodoList
