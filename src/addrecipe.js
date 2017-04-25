import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input,Row, Col } from 'reactstrap';


export default class Addrecipe extends Component{
    constructor(props){
        super(props);
        this.toggle=this.toggle.bind(this);
        this.changename=this.changename.bind(this);
        this.changerecipe=this.changerecipe.bind(this);
        this.add=this.add.bind(this);
        this.cancel=this.cancel.bind(this);
        this.state = {
            name:'',
            recipes:'',
        }
    }
    toggle(){
        this.props.toggle();
    }
    changename(event){
        this.setState({
            name:event.target.value
        });
        console.log(this.state.name)
    }
    changerecipe(event){
        this.setState({
            recipes:event.target.value
        });
        console.log(this.state.recipes)
    }

    add(){
        if(this.state.name&&this.state.recipes){
            this.props.save({title:this.state.name, ingredients:this.state.recipes.split(',')},this.props.index);}
        this.setState({
            name:'',
            recipes:'',
        });
        this.toggle();
    }
    cancel(){
        this.setState({
            name:'',
            recipes:'',
        });
        this.toggle();
    }



    render(){
        return (
            <div>

                <Row>

                    <Col   sm={{ size: 10, push: 1, pull: 1, offset: 0 }}>
                        <Button onClick={this.toggle} color="info" size="md" >Add Recipe</Button>
                    </Col>
                </Row>
                <Modal isOpen={this.props.modal} toggle={this.toggle}   >
                    <ModalHeader toggle={this.toggle}>Add a reccipe</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Recipe</Label>
                                <Input onChange={(event)=>this.changename(event)} value={this.state.name} placeholder="Please input recipe name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ingredient</Label>
                                <Input onChange={(event)=>this.changerecipe(event)} value={this.state.recipes} placeholder="Enter Ingredient, Seperated, By Commans"/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.add} color="primary">Add Recipe</Button>
                        <Button onClick={this.cancel} color="danger">Cancel</Button>
                    </ModalFooter>

                </Modal>
            </div>
        );
    }
}