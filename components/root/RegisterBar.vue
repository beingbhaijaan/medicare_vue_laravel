<template>
    <!-- Register
    ============================================= -->
    <section class="features bg_white">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="feature">
                        <i class="pull-left feature-icon fa fa-plus-circle"></i>
                        <div class="feature-content">
                            <h5><a href="#.">Are you a patient?</a></h5>
                            <p>Slightely description on what you can get here</p>
                            <router-link :to="{ name: 'join-as-patient' }"> <i class="fas fa-long-arrow-alt-right m_right_5"></i>Register now</router-link>
                        </div>
                    </div>
                </div>
            
                <div class="col-md-4">
                    <div class="feature">
                        <i class="pull-left feature-icon fa fa-user-md"></i>
                        <div class="feature-content">
                            <h5><a href="#.">Are you a doctor?</a></h5>
                            <p>Slightely description on what you can get here</p>
                            <router-link :to="{ name: 'join-as-doctor' }"> <i class="fas fa-long-arrow-alt-right m_right_5"></i>Register now</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature">
                        <i class="pull-left feature-icon fa fa-briefcase"></i>
                        <div class="feature-content">
                            <h5><a href="#.">Are you a partner</a></h5>
                            <p>Slightely description on what you can get here</p>
                            <router-link :to="{ name: 'join-as-partner' }"> <i class="fas fa-long-arrow-alt-right m_right_5"></i>Register now</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'RegisterBar',
    }
</script>
