<template>
    <div class="login">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Log-in</div>
                    <a href="https://ruurd.dev/accounts">Register or change password</a>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('email')">
                                <label for="email">Email</label>
                                <md-input name="email" id="email" autocomplete="email" v-model="form.email"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                                <span class="md-error" v-else-if="!$v.form.email.minlength">Invalid email</span>
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
            email: null,
            password: null,
        },
        userSaved: false,
        loginFail: false,
        sending: false,
        lastUser: null
    }),
    validations: {
        form: {
            email: {
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
            this.form.email = null;
            this.form.password = null;
        },
        async saveUser() {
            this.sending = true;
            let auth = await ServerApi.auth(this.form.email, this.form.password);
            this.sending = false;
            if (auth) {
                localStorage.auth = JSON.stringify({email: this.form.email, password: this.form.password});
                this.lastUser = `${this.form.email}`;
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