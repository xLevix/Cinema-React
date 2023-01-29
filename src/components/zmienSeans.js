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
import {format, parseISO} from 'date-fns'



export default class ZmienSeans extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeSeans = this.onChangeSeans.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);

        this.state = {
            seanse: [],
            seans: "",
            seans_info: [],
            date: "",
            price: "",
            seats: "",
            successful: false,
            message: "",
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/seanse', { headers: authHeader() })
            .then(response => {
                this.setState({ seanse: response.data })
            })
            .catch(error => {
                console.log(error);
            });

    }


    loadInfo(id) {
        axios.get('http://localhost:8080/seanse/'+id, { headers: authHeader() })
            .then(response => {
                this.setState({ seans_info: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChangeSeans(e) {
        this.setState({
            seans: e.target.value,
        });
        this.loadInfo(e.target.value);
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
        return !(this.state.seans_info.id=== "" || this.state.date === "" || this.state.price === "" || this.state.seats === "");
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            axios.put('http://localhost:8080/seanse/modify/'+this.state.seans_info.id, {
                    date: this.state.date,
                    price: this.state.price,
                    seats: this.state.seats,
                    idMovie: this.state.seans_info.idMovie.id,
                }, { headers: authHeader() }
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
                                    Aktualizuj senase
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
                                        <FormLabel>Wybierz seans</FormLabel>
                                        <Select
                                        onChange={this.onChangeSeans}
                                        >
                                            {this.state.seanse.map((seans) => (
                                                <option key={seans.id} value={seans.id}>{'Seans nr: ' + seans.id + ' Film: '+ seans.idMovie.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {this.state.seans_info.date &&
                                        <FormControl id="date" isRequired={true}>
                                            <FormLabel>Wybierz date</FormLabel>
                                            <Input
                                                onChange={this.onChangeDate}
                                                placeholder="Data seansu"
                                                size="md"
                                                type="datetime-local"
                                                value={format(parseISO(this.state.seans_info.date), "yyyy-MM-dd'T'HH:mm")}
                                            />
                                        </FormControl>
                                    }

                                    {this.state.seans_info.price && (
                                        <FormControl id="price" isRequired={true}>
                                            <FormLabel>Cena</FormLabel>
                                            <Input
                                                onChange={this.onChangePrice}
                                                placeholder="Cena"
                                                size="lg"
                                                type="number"
                                                value={this.state.seans_info.price}
                                            />
                                        </FormControl>
                                    )}

                                    {this.state.seans_info.seats && (
                                        <FormControl id="seats" isRequired={true}>
                                            <FormLabel>Ilosc miejsc</FormLabel>
                                            <Input
                                                onChange={this.onChangeSeats}
                                                placeholder="Ilosc miejsc"
                                                size="lg"
                                                type="number"
                                                value={this.state.seans_info.seats}
                                            />
                                        </FormControl>
                                    )}

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
                                            Aktualizuj seans
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
