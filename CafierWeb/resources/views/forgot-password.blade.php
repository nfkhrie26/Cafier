<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans h-screen w-full flex text-gray-800">

    <!-- Sisi Kiri: Tempat Logo -->
    <div class="flex-1 flex justify-center items-center p-10">
        <img src="{{ asset('images/logo-serene-cokelat.png') }}" alt="Serene Logo" class="max-w-[70%] h-auto">
    </div>

    <!-- Sisi Tengah: Garis Pemisah -->
    <div class="w-[1px] bg-[#b5a999] my-24"></div>

    <!-- Sisi Kanan: Form Forgot Password -->
    <div class="flex-1 px-12 lg:px-[100px] flex flex-col justify-center">
        <!-- Tulisan Welcome -->
        <h1 class="text-center font-bold text-[40px] mb-[40px] text-[#3a2215]">Welcome</h1>
        
        <form action="#" method="POST" autocomplete="off" class="max-w-[550px] mx-auto w-full"> 
            @csrf 
            
            <div class="mb-[20px]">
                <label for="username" class="block text-[18px] mb-2 font-semibold text-[#3a2215]">Username</label>
                <input type="text" id="username" name="username" required autocomplete="new-username"
                    class="w-full py-3.5 px-5 border border-[#cbbba8] rounded-full bg-[#f3e8d2] box-border outline-none transition-colors duration-300 focus:border-[#c47b3b]">
            </div>

            <!-- Margin disamakan jadi mb-[30px] -->
            <div class="mb-[35px]">
                <label for="email" class="block text-[18px] mb-2 font-semibold text-[#3a2215]">Email</label>
                <input type="email" id="email" name="email" required autocomplete="email"
                    class="w-full py-3.5 px-5 border border-[#cbbba8] rounded-full bg-[#f3e8d2] box-border outline-none transition-colors duration-300 focus:border-[#c47b3b]">
            </div>

            <!-- Tombol dibikin ukuran tetap w-[220px] -->
            <div class="flex justify-center">
                <button type="submit" 
                    class="w-[220px] py-3.5 bg-[#c27d42] text-white border-none rounded-full font-bold text-[18px] mt-[10px] cursor-pointer transition-colors duration-300 hover:bg-[#a86934]">
                    Send to email
                </button>
            </div>
            
            <a href="/" class="block text-center mt-6 text-[16px] font-bold text-[#111] no-underline hover:underline">
                Back to login
            </a>
            
        </form>
    </div>

</body>
</html>