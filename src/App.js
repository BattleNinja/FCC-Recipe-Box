import React, { Component } from 'react';
import './App.css';
import { Collapse, Button,ListGroup, ListGroupItem,Row, Col } from 'reactstrap';
import Addrecipe from "./addrecipe";
import Editrecipe from "./editrecipe"

const recipebook = (typeof window.localStorage.recipebook!=='undefined')? JSON.parse(window.localStorage.recipebook):[
    {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]},
    {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]},
    {title: "Onion Pie", ingredients: ["Onion", "Pise Crust", "Sounds Yummy right?"]}
];


export default class App extends Component {
    constructor(props) {
        super(props);
        this.collapse = this.collapse.bind(this);
        this.addtoggle=this.addtoggle.bind(this);
        this.edittoggle=this.edittoggle.bind(this);
        this.delet=this.delet.bind(this);
        this.save=this.save.bind(this);
        this.update=this.update.bind(this);
        this.state = {
            recipes:recipebook,
            safevalue:{title:'', ingredients: []},
            collapeindex:100,
            addmodal:false,
            editmodal:false,
            globalposition:1,
            globaltitle:'',
            globalingredients:''

        };
    }
    update(){
        localStorage.setItem('recipebook',JSON.stringify(this.state.recipes));
    }
    collapse(index) {
        if (this.state.collapeindex!==index){
            this.setState({ collapeindex: index });
        }
        else{
            this.setState({ collapeindex: 100 });
        }
        //console.log(this.state.recipes[index]['title'])

    }
    addtoggle(){
        this.setState({
            addmodal:!this.state.addmodal
        });
    }


    edittoggle(index){
        this.setState({
            editmodal:!this.state.editmodal,
            globalposition:index,
        });
        //console.log(index)
    }





    delet(index){
        let tem = this.state.recipes;
        tem.splice(index,1);
        this.setState({
            recipes:tem
        });
        this.update();
       // console.log("works")
    }
    save(recipe,index){
        let tem =  this.state.recipes;
        tem.splice(index,1,recipe);
        this.setState({
            recipes:tem
        });
        this.update();
       // console.log(this.state.recipes)
    }

    render() {
        const output = this.state.recipes.map((recipe,index)=>{
            return(
                <div key={index}>
                    <ListGroup  className="list">
                        <ListGroupItem  color="info" tag="a" href="#"  onClick={()=>this.collapse(index)}>{recipe["title"]}</ListGroupItem>
                        <Collapse isOpen={this.state.collapeindex===index}>
                            {recipe["ingredients"].map((ingredient,index)=>{return <ListGroupItem key={'ingredient'+index}>{ingredient}</ListGroupItem>})}
                            <ListGroupItem>
                                <Button onClick={()=>this.edittoggle(index)} >Edit</Button>{' '}
                                <Button onClick={()=>this.delet(index)} color="danger">Delet</Button>
                            </ListGroupItem>
                    </Collapse >
                    </ListGroup>

                </div>);
        });


        return (
            <div >
                <div className="text-center">
                    <br/>
                    <h1 className="red">Create your own Recipe</h1>
                    <br/>
                    <Row>
                        <Col sm={{ size: 10, push: 1, pull: 1, offset: 0 }}>
                            <div className="grey">
                                {output}
                                </div>
                        </Col>
                    </Row>
                </div>
                <Editrecipe modal={this.state.editmodal} toggle={this.edittoggle} index={this.state.globalposition} save={this.save} recipe={(this.state.globalposition>=this.state.recipes.length)?this.state.safevalue:this.state.recipes[this.state.globalposition]}  />
                <br/>
                <Addrecipe  modal={this.state.addmodal}  toggle={this.addtoggle} index={this.state.recipes.length} save={this.save}   />
            </div>
        );
    }
}


