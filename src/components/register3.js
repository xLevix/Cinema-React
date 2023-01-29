import React, {Component, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import {
    Box, Button, Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    InputGroup, InputRightElement, Link,
    Stack,
    Text, useColorModeValue,
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeshowPassword = this.onChangeshowPassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            showPassword: false
        };
    }

    onChangeshowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
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
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
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
                        {!this.state.successful && (
                            <Flex
                                minH={'100vh'}
                                align={'center'}
                                justify={'center'}
                                bg="white" _dark={{bg: 'gray.700'}}>
                                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                    <Stack align={'center'}>
                                        <Heading fontSize={'4xl'} textAlign={'center'}>
                                            Sign up
                                        </Heading>
                                        <Text fontSize={'lg'} color={'gray.600'}>
                                            to enjoy all of our cool features ✌️
                                        </Text>
                                    </Stack>
                                    <Box
                                        rounded={'lg'}
                                        bg="white" _dark={{bg: 'gray.700'}}
                                        boxShadow={'lg'}
                                        p={8}>
                                        <Stack spacing={4}>
                                            <HStack>
                                                <Box>
                                                    <FormControl id="username">
                                                        <FormLabel>Username</FormLabel>
                                                        <Input type="text"
                                                               className="form-control"
                                                               name="username"
                                                               placeholder="username"
                                                               variant="filled"
                                                               value={this.state.username}
                                                               onChange={this.onChangeUsername}
                                                               //validations={[required, vusername]}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </HStack>
                                            <FormControl id="email" isRequired>
                                                <FormLabel>Email address</FormLabel>
                                                <Input type="email"
                                                       className="form-control"
                                                       name="email"
                                                       placeholder="Email"
                                                       variant="filled"
                                                       value={this.state.email}
                                                       onChange={this.onChangeEmail}
                                                      // validations={[required, email]}
                                                />
                                            </FormControl>
                                            <FormControl id="password" isRequired>
                                                <FormLabel>Password</FormLabel>
                                                <InputGroup>
                                                    <Input type={this.state.showPassword ? 'text' : 'password'}
                                                           className="form-control"
                                                           name="password"
                                                           placeholder="*******"
                                                           variant="filled"
                                                           value={this.state.password}
                                                           onChange={this.onChangePassword}
                                                           //validations={[required, vpassword]}
                                                    />
                                                    <InputRightElement h={'full'}>
                                                        <Button
                                                            variant={'ghost'}
                                                            onClick={this.onChangeshowPassword
                                                            }>
                                                            {this.state.showPassword ? <ViewOffIcon/> : <ViewIcon/>}

                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
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
                                                    Sign up
                                                </Button>
                                            </Stack>
                                            <Stack pt={6}>
                                                <Text align={'center'}>
                                                    Already a user? <Link href={'/login2'} color={'blue.400'}>Login</Link>
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                                </Flex>
                        )}

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
