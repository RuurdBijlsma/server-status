<template>
    <div class="login">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Log-in</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('user')">
                                <label for="user">Username</label>
                                <md-input name="user" id="user" autocomplete="username" v-model="form.user"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.user.required">The user name is required</span>
                                <span class="md-error" v-else-if="!$v.form.user.minlength">Invalid user name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('password')">
                                <label for="password">Password</label>
                                <md-input name="password" id="password" type="password" v-model="form.password"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending"/>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Save user</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was logged in with success!</md-snackbar>
            <md-snackbar :md-active.sync="loginFail">Credentials don't match any records!</md-snackbar>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        minLength,
    } from 'vuelidate/lib/validators'
    import ServerApi from "@/js/ServerApi";

    export default {
        name: "Login",
        mixins: [validationMixin],
        data: () => ({
            form: {
                user: null,
                password: null,
            },
            userSaved: false,
            loginFail: false,
            sending: false,
            lastUser: null
        }),
        validations: {
            form: {
                user: {
                    required,
                    minLength: minLength(3)
                },
                password: {
                    required,
                    minLength: minLength(3)
                },
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset();
                this.form.user = null;
                this.form.password = null;
            },
            async saveUser() {
                this.sending = true;
                let auth = await ServerApi.auth(this.form.user, this.form.password);
                this.sending = false;
                if (auth) {
                    localStorage.auth = JSON.stringify({user: this.form.user, password: this.form.password});
                    this.lastUser = `${this.form.user}`;
                    this.userSaved = true;
                    this.clearForm();
                    location.href = '#/performance/cpu';
                    location.reload();
                } else {
                    this.loginFail = true;
                }
            },
            async validateUser() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            }
        }
    }
</script>

<style scoped>

</style>