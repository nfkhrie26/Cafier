<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Karyawan - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800 relative">

    <!-- Navbar -->
    <nav class="w-full bg-[#3d2a1d] px-8 py-3 flex justify-between items-center shadow-md relative">
        <div class="flex items-center">
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
                <a href="{{ route('dashboard') }}" class="text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Home</a>
                <a href="{{ route('menu.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Menu</a>
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                
                <a href="#" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Daftar Karyawan</a>
                
                <a href="{{ route('keuangan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <!-- Tombol Tambah Karyawan -->
        <div class="flex justify-center mb-12">
            <button onclick="openEmployeeModal()" class="bg-[#cd833c] text-white px-24 py-3.5 rounded-[14px] font-medium text-[22px] hover:bg-[#a86934] transition-colors shadow-sm tracking-wide">
                Tambah Karyawan
            </button>
        </div>

        <!-- Dummy Data Karyawan -->
        @php
            $karyawans = [
                ['nama' => 'Adrian', 'posisi' => 'Barista', 'gambar' => 'https://ui-avatars.com/api/?name=Adrian&background=2c3e50&color=fff'],
                ['nama' => 'Siska', 'posisi' => 'Head Barista', 'gambar' => 'https://ui-avatars.com/api/?name=Siska&background=2c3e50&color=fff'],
                ['nama' => 'Bima', 'posisi' => 'Barista', 'gambar' => 'https://ui-avatars.com/api/?name=Bima&background=2c3e50&color=fff'],
                ['nama' => 'Clara', 'posisi' => 'Pastry Chef', 'gambar' => 'https://ui-avatars.com/api/?name=Clara&background=2c3e50&color=fff'],
                ['nama' => 'Deni', 'posisi' => 'Cashier', 'gambar' => 'https://ui-avatars.com/api/?name=Deni&background=2c3e50&color=fff'],
                ['nama' => 'Eka', 'posisi' => 'Floor Staff', 'gambar' => 'https://ui-avatars.com/api/?name=Eka&background=2c3e50&color=fff'],
                ['nama' => 'Wijaya', 'posisi' => 'Inventory Clerk', 'gambar' => 'https://ui-avatars.com/api/?name=Wijaya&background=2c3e50&color=fff'],
                ['nama' => 'Rose', 'posisi' => 'Social Media Specialist', 'gambar' => 'https://ui-avatars.com/api/?name=Rose&background=2c3e50&color=fff'],
                ['nama' => 'Cila', 'posisi' => 'Quality Control', 'gambar' => 'https://ui-avatars.com/api/?name=Cila&background=2c3e50&color=fff'],
            ];
        @endphp

        <!-- Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($karyawans as $karyawan)
            <div class="bg-[#f5eedc] rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full">
                <div class="flex items-center gap-6 mb-6">
                    <div class="w-20 h-20 rounded-2xl overflow-hidden bg-black shadow-inner flex-shrink-0">
                        <img src="{{ $karyawan['gambar'] }}" alt="{{ $karyawan['nama'] }}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col items-center flex-1">
                        <h3 class="text-[#3a2215] text-[22px] font-medium mb-1">{{ $karyawan['nama'] }}</h3>
                        <p class="text-[#3a2215] text-[14px] font-bold text-center leading-tight">
                            {{ $karyawan['posisi'] }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 mt-auto">
                    <button onclick="openEmployeeModal('{{ $karyawan['nama'] }}', '{{ $karyawan['posisi'] }}')" class="flex-1 bg-[#ffcc00] hover:bg-[#e6b800] text-white text-[15px] font-bold py-3 rounded-full transition-colors shadow-sm">
                        Cek Profil
                    </button>
                    <button class="w-[46px] h-[46px] bg-[#ff4b4b] hover:bg-[#e64343] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            @endforeach
        </div>
    </main>

    <!-- ========================================== -->
    <!-- MODAL / POP-UP KARYAWAN                    -->
    <!-- ========================================== -->
    <div id="employeeModal" class="fixed inset-0 bg-black/40 hidden z-50 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300">
        <div class="bg-[#f5eedc] rounded-[24px] p-10 w-full max-w-[650px] shadow-2xl relative transform scale-95 transition-transform duration-300" id="modalContent">
            
            <form class="flex flex-col gap-4">
                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Nama</label>
                    <input type="text" id="empNama" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2 outline-none">
                </div>

                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Pekerjaan/Jabatan</label>
                    <input type="text" id="empJabatan" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2 outline-none">
                </div>

                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Foto</label>
                    <input type="file" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] rounded-xl px-4 py-2 outline-none cursor-pointer">
                </div>

                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Email</label>
                    <input type="email" id="empEmail" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2 outline-none">
                </div>

                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Username</label>
                    <input type="text" id="empUser" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2 outline-none">
                </div>

                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Password</label>
                    <!-- Input password -->
                    <input type="password" id="empPass" class="w-full bg-[#f1e6cd] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2 outline-none">
                </div>

                <div class="flex justify-center gap-6 mt-6">
                    <button type="button" onclick="closeEmployeeModal()" class="bg-[#ff4b4b] hover:bg-[#e64343] text-white px-12 py-3 rounded-2xl font-bold text-[17px] transition-colors shadow-sm w-[180px]">
                        Kembali
                    </button>
                    <button type="submit" id="btnSubmitModal" class="bg-[#00ff2a] hover:bg-[#00e626] text-white px-12 py-3 rounded-2xl font-bold text-[17px] transition-colors shadow-sm w-[180px]">
                        Unggah
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const modal = document.getElementById('employeeModal');
        const content = document.getElementById('modalContent');
        const btnSubmit = document.getElementById('btnSubmitModal');
        const passInput = document.getElementById('empPass');

        function openEmployeeModal(nama = '', jabatan = '') {
            modal.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);

            if (nama !== '') {
                // MODE UPDATE (Cek Profil)
                btnSubmit.innerText = "Update";
                document.getElementById('empNama').value = nama;
                document.getElementById('empJabatan').value = jabatan;
                document.getElementById('empUser').value = nama.toLowerCase();
                document.getElementById('empEmail').value = nama.toLowerCase() + "@serene.com";
                
                // BIAR KELIHATAN ADA ISINYA (Hide tapi keiisi)
                passInput.value = "password-rahasia"; 
            } else {
                // MODE TAMBAH (Unggah)
                btnSubmit.innerText = "Unggah";
                document.getElementById('empNama').value = "";
                document.getElementById('empJabatan').value = "";
                document.getElementById('empUser').value = "";
                document.getElementById('empEmail').value = "";
                
                // BIAR KOSONG PLONG
                passInput.value = ""; 
            }
        }

        function closeEmployeeModal() {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        modal.addEventListener('click', (e) => { if (e.target === modal) closeEmployeeModal(); });
    </script>
</body>
</html>