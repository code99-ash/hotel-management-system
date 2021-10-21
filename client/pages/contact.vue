<template>
    <div>

        <div class="overlay"></div>
            <div class="banner"></div>
            <div class="sub-banner">
                <h3 class="text-center text-light title">Contact Lego<span class="text-primary">.</span></h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="p-btm">
                    <path fill="#ffffff" fill-opacity="1" d="M0,64L48,85.3C96,107,192,149,288,181.3C384,213,480,235,576,208C672,181,768,107,864,96C960,85,1056,139,1152,160C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-9 mx-auto font-family-helvetica bg-light p-5 mt-5">
                        <div>
                            <form action="">
                                <div class="form-group my-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <input type="text" class="form-control" placeholder="Name">
                                        </div>
                                        <div class="col-6">
                                            <input type="email" class="form-control" placeholder="Email Address">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group my-3">
                                    <input type="text" class="form-control" placeholder="Subject">
                                </div>
                                <div class="form-group mb-3">
                                    <textarea class="form-control" placeholder="Message"></textarea>
                                </div>
                                <div class="form-group mb-3">
                                    <button class="btn btn-primary w-100">Send <i class="fa fa-plane" aria-hidden="true"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import "~/assets/css/style.css";

export default {
    layout: 'Customer'
}
</script>

<style scoped>
    .font-family-helvetica {
        font-family: Georgia, 'Times New Roman', Times, serif !important;
        line-height: 2em;
        letter-spacing: 2px;
        font-size: 20px;
    }
    .overlay {
        width: 100vw;
        height: 70vh;
        background: #000;
        position: absolute
    }
    .banner {
        width: 100vw;
        height: 70vh;
        background: url('/images/home/vip/vip4.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: .4;
    }
    .sub-banner {
        position: absolute;
        top: 50px;
        left: 0;
        padding-top: 50px;
        width: 100vw;
        height: 100%;
    }
    .p-btm {
        position: absolute;
        /* margin-bottom: 0; */
        bottom: calc(100vh - 70vh);
        fill: #ffffff !important;
    }
    .title {
        font-size: 75px;
        text-shadow: 8px 4px 4px rgb(3, 1, 12);
    }
</style>