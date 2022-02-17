import {useState} from "react";
import {Card, ListGroup} from "react-bootstrap";


function IngredientList(props) {
    const [ingredients] = useState(props.ingredients)


    return (
        <Card style={{width: '40rem'}}>
            <Card.Header>Ingredienser: </Card.Header>
            <ListGroup variant="flush">
                { ingredients.map( ingredient => {
                    return <ListGroup.Item> { ingredient} </ListGroup.Item>
                })}
            </ListGroup>
        </Card>
    )
}

export default IngredientList;