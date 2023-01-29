import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
    Box, Button, Flex,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    Text, Textarea
} from "@chakra-ui/react";

import axios from "axios";
import authHeader from "../services/auth-header";

// const required = value => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This field is required!
//             </div>
//         );
//     }
// };
//
//
// const vusername = value => {
//     if (value.length < 3 || value.length > 20) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 The username must be between 3 and 20 characters.
//             </div>
//         );
//     }
// };
//
// const vpassword = value => {
//     if (value.length < 6 || value.length > 40) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 The password must be between 6 and 40 characters.
//             </div>
//         );
//     }
// };

export default class DodajFilm extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangePegi = this.onChangePegi.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        this.onChangeRating= this.onChangeRating.bind(this);

        this.state = {
            name: "",
            description: "",
            pegi: "",
            image: "",
            rating: "",
            successful: false,
            message: ""
        };
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangedescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }

    onChangePegi(e) {
        this.setState({
            pegi: e.target.value
        });
    }

    onChangeimage(e) {
        this.setState({
            image: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            axios.post("http://localhost:8080/filmy/add", {
                name: this.state.name,
                description: this.state.description,
                pegi: this.state.pegi,
                image: this.state.image,
                rating: this.state.rating
            }, {
                headers: authHeader()
                }
                ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.handleRegister}
                ref={c => {
                    this.form = c;
                }}
            >
                {this.state.message && (
                    <div className="form-group">
                        <div
                            className={
                                this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {this.state.message}
                        </div>
                    </div>
                )}

                {!this.state.successful && (
                    <Flex
                        minH={'100vh'}
                        align={'center'}
                        justify={'center'}
                        bg="white" _dark={{bg: 'gray.700'}}>
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                            <Stack align={'center'}>
                                <Heading fontSize={'4xl'} textAlign={'center'}>
                                    Dodaj Film
                                </Heading>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    do bazy danych
                                </Text>
                            </Stack>
                            <Box
                                rounded={'lg'}
                                bg="white" _dark={{bg: 'gray.700'}}
                                boxShadow={'lg'}
                                p={8}>
                                <Stack spacing={4}>
                                    <FormControl id="name">
                                        <FormLabel>Nazwa filmu</FormLabel>
                                        <Input type="text"
                                               className="form-control"
                                               name="name"
                                               placeholder="Nazwa filmu"
                                               variant="filled"
                                               value={this.state.name}
                                               onChange={this.onChangename}
                                            //validations={[required, vusername]}
                                        />
                                    </FormControl>
                                    <FormControl id="description" isRequired>
                                        <FormLabel>Opis filmu</FormLabel>
                                        <Textarea type="text"
                                               className="form-control"
                                               name="description"
                                               placeholder="Opis filmu"
                                               variant="filled"
                                               value={this.state.description}
                                               onChange={this.onChangedescription}
                                            // validations={[required, email]}
                                        />
                                    </FormControl>
                                    <FormControl id="rating" isRequired>
                                        <FormLabel>Rating</FormLabel>
                                            <Input type='number'
                                                   className="form-control"
                                                   name="rating"
                                                   placeholder="Rating"
                                                   variant="filled"
                                                   value={this.state.rating}
                                                   onChange={this.onChangeRating}
                                                    //validations={[required, vpassword]}
                                            />
                                    </FormControl>

                                    <FormControl id="pegi">
                                        <FormLabel>Pegi</FormLabel>
                                        <Input type="number"
                                               className="form-control"
                                               name="pegi"
                                               placeholder="Pegi"
                                               variant="filled"
                                               value={this.state.pegi}
                                               onChange={this.onChangePegi}
                                            //validations={[required, vusername]}
                                        />
                                    </FormControl>

                                    <FormControl id="image">
                                        <FormLabel>Obraz</FormLabel>
                                        <Input type="text"
                                               className="form-control"
                                               name="image"
                                               placeholder="Obraz URL"
                                               variant="filled"
                                               value={this.state.image}
                                               onChange={this.onChangeimage}
                                            //validations={[required, vusername]}
                                        />
                                    </FormControl>

                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={'blue.400'}
                                            onClick={this.handleRegister}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            Dodaj film
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                )}

                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        );

    }
}
