<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Menu - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800">

    <!-- Navbar -->
    <nav class="w-full bg-[#3d2a1d] px-8 py-3 flex justify-between items-center shadow-md relative">
        <div class="flex items-center">
            <!-- Ganti dengan path logo putih kamu -->
            <img src="{{ asset('images/logo.png') }}" alt="Serene Logo" class="h-16 object-contain">
        </div>
        <h1 class="text-white text-[28px] font-normal tracking-wide absolute left-1/2 transform -translate-x-1/2 m-0 whitespace-nowrap">
            Welcome back Pemilik
        </h1>
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent">
            <img src="https://ui-avatars.com/api/?name=Pemilik&background=c27d42&color=fff" alt="Profile" class="w-full h-full object-cover">
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-[1100px] mx-auto pt-10 pb-12 px-6">
        
        <!-- Navigation Pills (Sub-menu) -->
        <div class="flex justify-center mb-12">
            <div class="bg-[#a88669] rounded-full flex items-center p-1 shadow-sm overflow-hidden">
                <!-- Link Home -->
                <a href="{{ route('dashboard') }}" class="text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Home</a>
                
                <!-- Link Daftar Menu (AKTIF) -->
                <a href="{{ route('menu.index') }}" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Daftar Menu</a>
                
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                <a href="{{ route('karyawan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Karyawan</a>
                <a href="{{ route('keuangan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <!-- Tombol Tambah Menu -->
        <div class="flex justify-center mb-12">
            <button class="bg-[#cd833c] text-white px-24 py-3.5 rounded-[14px] font-medium text-[22px] hover:bg-[#a86934] transition-colors shadow-sm tracking-wide">
                Tambah Menu
            </button>
        </div>

        <!-- Karena datanya udah ada di utils/controller, di sini aku simulasiin pakai array PHP statis buat testing UI -->
        @php
            $menus = [
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
                ['nama' => 'Hot Latte', 'harga' => 'Rp. 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop'],
            ];
        @endphp

        <!-- Grid Container untuk Card Menu (Bisa looping data aslimu di sini) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            @foreach($menus as $menu)
            <!-- Card Menu -->
            <div class="bg-[#f5eedc] rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full">
                
                <!-- Bagian Atas: Gambar & Info -->
                <div class="flex items-center gap-5 mb-6">
                    <!-- Frame Gambar Kopi Bulat -->
                    <div class="w-24 h-24 rounded-full overflow-hidden bg-white shadow-inner flex-shrink-0">
                        <img src="{{ $menu['gambar'] }}" alt="{{ $menu['nama'] }}" class="w-full h-full object-cover">
                    </div>
                    
                    <!-- Teks Nama & Harga -->
                    <div>
                        <h3 class="text-[#3a2215] text-[22px] font-medium mb-1">{{ $menu['nama'] }}</h3>
                        <p class="text-[#e2ce27] text-[18px] font-medium">{{ $menu['harga'] }}</p>
                    </div>
                </div>

                <!-- Bagian Bawah: Tombol Action -->
                <div class="flex items-center gap-3 mt-auto">
                    <!-- Tombol Ubah Menu -->
                    <button class="flex-1 bg-[#ffcc00] hover:bg-[#e6b800] text-white text-[15px] font-bold py-3 rounded-full transition-colors">
                        Ubah Menu
                    </button>
                    
                    <!-- Tombol Hapus (Merah) -->
                    <button class="w-[46px] h-[46px] bg-[#ff4b4b] hover:bg-[#e64343] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                        <!-- Ikon Trash/Sampah -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            @endforeach

        </div>

    </main>

</body>
</html>