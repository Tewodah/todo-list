import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableOpacity, } from "react-native";
import { useSelector } from "react-redux";
import { error, loading } from "../lib/features/TodoList/reducers";
import { getTodos, updateTodoStatus, deleteTodo } from "../lib/features/TodoList/service";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TodoList({ navigation }) {
  const { todoList, loading, error } = useSelector((state) => state.todoList);

  function changeTodostatus(todo) {

    updateTodoStatus({ id: todo.id, completed: !todo.completed });

  }



  useEffect(() => {
    getTodos();
  }, []);

  if (loading === true) {
    return <Text style={styles.loading}>loading...</Text>
  }
  if (error === true) {
    return <Text style={styles.error}>error...</Text>
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/R.jpg')} style={{ width: '100%', height: '30%' }} />

      <Text style={styles.title}>Todo List 2025</Text>
      <Button
        style={styles.addTodo}
        title="Add Task"
        onPress={() => navigation.navigate("todoForm")}
      />
      <TextInput placeholder="search" style={styles.input}></TextInput>
      <ScrollView>
        {todoList.map((todo, i) => (
          <View style={styles.todoContainer} key={i}>
            <Text style={styles.todoText}>{todo.title} </Text>
            <TouchableOpacity onPress={() => changeTodostatus(todo)}>
              <MaterialCommunityIcons
                name={todo.completed ? "checkbox-marked" : "checkbox-blank"}
                size={40}
                color={todo.completed ? "green" : "white"}
                style={{ paddingHorizontal: 30 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTodo({ id: todo.id })}>
              <MaterialCommunityIcons
                name="delete"
                size={40}
                color="red"
                style={{ paddingHorizontal: 30 }}
              />
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  error: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  addTodo: {
    color: "#fff",
    backgroundColor: "#FE9900",
    Text: "#3333333",

  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    padding: 20,
    color: "black",
    transparent: 0.5,
    fontWeight: "600",
    fontFamily: "gothic, sans-serif",
  },
  input: {
    color: "black",
    Textsize: 40,
    backgroundColor: "GRAY",
    fontWeight: "600",
    Text: "#3333333",
    padding: 10,
    width: 610,
    textAlign: "start",
    boxShadow: "0 0 10px 0 rgba(48, 14, 238, 0.6)",
  },

  todoContainer: {

    backgroundColor: "#358AEC",
    flexDirection: "row",
    alignContent: "flex-end",
    color: "#000",
    borderRadius: 10,

  },

  todoText: {
    Text: "#3333333",
    width: 400,
    padding: 20,


  },
});
