import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';
import {Button, Checkbox, Flex, FormControl, FormLabel, Heading, Image, Link, Stack} from "@chakra-ui/react";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.router.navigate("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                                <Stack spacing={4} w={'full'} maxW={'md'}>
                                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                                    <FormControl id="username">
                                        <div className="form-group">
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text"
                                               name="username"
                                               className="form-control"
                                               value={this.state.username}
                                               onChange={this.onChangeUsername}
                                               validations={[required]}

                                        />
                                        </div>
                                    </FormControl>
                                    <div className="form-group">
                                    <FormControl id="password">
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password"
                                               name="password"
                                               className="form-control"
                                               alue={this.state.password}
                                               onChange={this.onChangePassword}
                                               validations={[required]} />
                                    </FormControl>
                                    </div>

                                    <Stack spacing={6}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Link color={'blue.500'}>Forgot password?</Link>
                                        </Stack>
                                        <Button colorScheme={'blue'} variant={'solid'}
                                                disabled={this.state.loading}
                                                type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {this.state.message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}
                                    </Stack>
                                </Stack>
                            </Flex>

                            <Flex flex={1}>
                                <Image
                                    alt={'Login Image'}
                                    objectFit={'cover'}
                                    src={
                                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                                    }
                                />
                            </Flex>
                        </Stack>
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

export default withRouter(Login);