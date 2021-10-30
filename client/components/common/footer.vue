<template>
    <div class="w-100 position-absolute d-block">
            <footer class="container-fluid py-3" style="background: #030e20">
                <div class="row">
                    <div class="col-12 col-md">
                        <nuxt-link to="/" class="text-white logo" style="font-size: 80px !important">
                            <strong>Lego<span class="text-primary">.</span></strong>
                        </nuxt-link>
                        <small class="d-block mb-3 text-muted">© 2021-2021</small>
                        <!-- <p class="text-muted">developed by code99-ash</p> -->
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">Pages</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Home</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">About</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">Room Categories</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Luxury</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Standard</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Regular</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">More</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Team</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Locations</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Privacy</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>