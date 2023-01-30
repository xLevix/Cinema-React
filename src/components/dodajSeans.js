import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {
    Box, Button, Flex,
    FormControl,
    FormLabel,
    Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select,
    Stack,
    Text, Textarea
} from "@chakra-ui/react";

import axios from "axios";
import authHeader from "../services/auth-header";


export default class DodajSeans extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFilm = this.onChangeFilm.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);

        this.state = {
            films: [],
            film: "",
            date: "",
            price: "",
            seats: "",
            successful: false,
            message: ""
        };
    }

    componentDidMount() {
        axios.get('https://kino-spring.herokuapp.com/filmy', { headers: authHeader() })
            .then(response => {
                this.setState({ films: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChangeFilm(e) {
        this.setState({
            film: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeSeats(e) {
        this.setState({
            seats: e.target.value
        });
    }

    checkAll() {
        return !(this.state.film === "" || this.state.date === "" || this.state.price === "" || this.state.seats === "");
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {

            if (this.checkAll()){
                axios.post("https://kino-spring.herokuapp.com/seanse/add", {
                        idMovie: this.state.film,
                        date: this.state.date,
                        price: this.state.price,
                        seats: this.state.seats,
                    }, {
                        headers: authHeader()
                    }
                ).then(
                    response => {
                        this.setState({
                            message: 'Dodano seans',
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
            }else{
                this.setState({
                    successful: false,
                    message: "Wypełnij wszystkie pola"
                });
            }

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
                                    Dodaj Seans
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
                                    <FormControl id="film" isRequired={true}>
                                        <FormLabel>Wybierz film</FormLabel>
                                        <Select
                                            placeholder={"Wybierz film"}
                                        onChange={this.onChangeFilm}
                                        >
                                            {this.state.films.map((film) => (
                                                <option key={film.id} value={film.id}>{film.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl id="date" isRequired={true}>
                                        <FormLabel>Wybierz date</FormLabel>
                                        <Input
                                            onChange={this.onChangeDate}
                                            placeholder="Data seansu"
                                            size="md"
                                            type="datetime-local"
                                        />
                                    </FormControl>
                                    <FormControl id="price" isRequired={true}>
                                        <FormLabel>Cena</FormLabel>
                                        <NumberInput precision={2} step={0.1} >
                                            <NumberInputField onChange={this.onChangePrice} />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>

                                        </NumberInput>
                                    </FormControl>

                                    <FormControl id="seats" isRequired={true}>
                                        <FormLabel>Ilosc miejsc</FormLabel>
                                        <NumberInput step={1} min={10} max={50} >
                                            <NumberInputField onChange={this.onChangeSeats} />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
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
                                            Dodaj seans
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
