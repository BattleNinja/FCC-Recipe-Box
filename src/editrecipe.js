import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input } from 'reactstrap';

export default class Editrecipe extends Component{
    constructor(props){

        super(props);
        this.toggle=this.toggle.bind(this);
        this.add=this.add.bind(this);
        this.state = {
            name:'',
            recipes:[]
        }
    }
    toggle(){
        this.props.toggle(this.props.index);
        //console.log(this.props.recipe['title'])
    }

    add(){
        let title=document.getElementById('editname').value;
        let ingredients=document.getElementById('editingredient').value.split(',')
        this.props.save({title:title, ingredients:ingredients},this.props.index);

        this.toggle();
    }



    render(){
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.toggle}   >
                    <ModalHeader toggle={this.toggle}>Add a reccipe</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Recipe</Label>
                                <Input id="editname"  defaultValue={this.props.recipe['title']} placeholder="Please input recipe name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ingredient</Label>
                                <Input id="editingredient"  defaultValue={this.props.recipe['ingredients'].join(',')} placeholder="Enter Ingredient, Seperated, By Commans"/>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.add}  color="primary">Edit Recipe</Button>
                        <Button onClick={this.toggle} color="danger">Cancel</Button>
                    </ModalFooter>

                </Modal>
            </div>
        );
    }
}