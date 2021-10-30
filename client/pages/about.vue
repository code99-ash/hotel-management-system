<template>
    <div>

        <div class="overlay"></div>
            <div class="banner"></div>
            <div class="sub-banner">
                <h3 class="text-center text-light title">About Lego<span class="text-primary">.</span></h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="c-btm">
                <path fill="#fff" fill-opacity="1" d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,192C840,213,960,203,1080,213.3C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

            <div class="container">
                <div class="row">
                    <div class="col-md-10 mx-auto font-family-helvetica bg-light p-5">
                        <h2 class="mb-3">About Lego Hotel</h2>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid incidunt cum assumenda velit, hic veniam nemo debitis ipsum porro, cupiditate delectus veritatis, nam commodi maxime! Amet ullam voluptatem praesentium, provident commodi labore ab eos error tempora autem debitis porro vitae odit eveniet, aspernatur architecto non? Architecto ad accusantium, qui aperiam et vitae eveniet. Id nemo, nihil excepturi consequatur ipsa tempora est rem dolorem, ab, odio minima? Doloribus earum, ex debitis vel labore eos accusamus ut numquam natus totam praesentium quae repellat sint officia maxime atque adipisci, nulla, quam alias cum magni. Repellat saepe quidem amet quas delectus natus iste praesentium expedita debitis incidunt est, at itaque laborum atque inventore modi tenetur harum. Officiis doloribus error consequuntur minus ipsa optio quis eligendi nobis. Dolore, autem enim ipsa inventore repellendus sit, soluta suscipit nihil libero, exercitationem eligendi cum impedit! Iure libero pariatur autem adipisci, porro neque ullam voluptate nemo modi quidem aliquid? Quas consequuntur iste deleniti facere, velit modi labore quibusdam voluptatum fugit possimus, explicabo ullam repudiandae iure sunt ex vel veniam asperiores fugiat corporis fuga accusantium blanditiis tempora magnam? Magni animi tenetur minus minima qui adipisci ea, delectus ipsa aut quod distinctio nam deleniti laudantium veniam totam? Repellat tempora doloribus corrupti quasi, odio doloremque ad itaque temporibus expedita nemo natus quam minus autem molestias laudantium totam dolore dicta, fugit quisquam quo vel aperiam. Assumenda ad earum ipsa expedita. Eligendi, accusantium quo! Accusamus numquam vero corporis amet quod, aspernatur ut blanditiis nesciunt eius voluptates incidunt nam necessitatibus accusantium minima perspiciatis porro deserunt.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    layout: 'Customer'
}
</script>

<style scoped>
    .font-family-helvetica {
        font-family: Georgia, 'Times New Roman', Times, serif !important;
        line-height: 2em;
        font-size: 20px;
    }
    .overlay {
        width: 100vw;
        height: 60vh;
        background: #000;
        position: absolute
    }
    .banner {
        width: 100vw;
        height: 60vh;
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
        padding-top: 70px;
        width: 100vw;
        height: 100%;
    }
    .c-btm {
        position: absolute;
        bottom: 40vh;
        fill: #ffffff !important;
    }
    .title {
        font-size: 75px;
        text-shadow: 8px 4px 4px rgb(3, 1, 12);
    }
</style>