<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Membership - Serene</title>
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
                <a href="{{ route('membership.index') }}" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Daftar Membership</a>                
                <a href="{{ route('keuangan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <!-- Grid Container untuk Card Membership -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            
            @foreach($memberships as $member)
            
            @php
                $nama = $member['name'] ?? 'Unknown';
                $tier = ucfirst($member['current_rank'] ?? 'Silver');
                
                // Ambil inisial 2 huruf pertama dari nama
                $words = explode(' ', $nama);
                $inisial = '';
                if(count($words) >= 2) {
                    $inisial = strtoupper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
                } else {
                    $inisial = strtoupper(substr($nama, 0, 2));
                }
                
                // Pilih warna background acak berdasarkan nama
                $bgColors = ['bg-[#2b3a4a]', 'bg-[#9b51e0]', 'bg-[#1b5e20]', 'bg-[#b71c1c]'];
                $bgIdx = strlen($nama) % count($bgColors);
                $bgStyle = $bgColors[$bgIdx];

                // Logika Warna Badge Tier
                $badgeStyle = '';
                if($tier == 'Platinum') {
                    $badgeStyle = 'bg-gradient-to-r from-[#452d1f] to-[#1c110b] text-white font-bold';
                } elseif ($tier == 'Gold') {
                    $badgeStyle = 'bg-gradient-to-r from-[#d18436] to-[#ad6117] text-white font-bold';
                } else {
                    $badgeStyle = 'bg-gradient-to-r from-[#e8e2da] to-[#bcab9e] text-[#3a2215] font-bold';
                }
            @endphp

            <!-- Card Membership -->
            <div class="bg-[#f5eedc] rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full">
                
                <!-- Bagian Atas: Gambar Inisial & Info -->
                <div class="flex items-center gap-6 mb-6">
                    <!-- Frame Gambar Inisial -->
                    <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-[28px] font-normal {{ $bgStyle }} shadow-inner flex-shrink-0">
                        {{ $inisial }}
                    </div>
                    
                    <!-- Teks Nama & Badge -->
                    <div class="flex flex-col items-center flex-1">
                        <h3 class="text-[#3a2215] text-[22px] font-medium mb-2">{{ $nama }}</h3>
                        <div class="{{ $badgeStyle }} px-6 py-1.5 rounded-full text-sm tracking-wide w-full text-center shadow-sm">
                            {{ $tier }}
                        </div>
                    </div>
                </div>

                <!-- Bagian Bawah: Tombol Action -->
                <div class="flex items-center gap-3 mt-auto">
                    <!-- Tombol Cek Profil (Buka Modal) -->
                    <button onclick="openModal('{{ $nama }}', '{{ $member['email'] ?? str_replace(' ', '', strtolower($nama)) . '@gmail.com' }}', '{{ isset($member['created_at']) ? substr($member['created_at'], 0, 10) : date('Y-m-d') }}')" class="flex-1 bg-[#ffcc00] hover:bg-[#e6b800] text-white text-[15px] font-bold py-3 rounded-full transition-colors">
                        Cek Profil
                    </button>
                    
                    <!-- Tombol Hapus (Merah) -->
                    <button class="w-[46px] h-[46px] bg-[#ff4b4b] hover:bg-[#e64343] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0">
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
    <!-- MODAL / POP-UP CEK PROFIL                  -->
    <!-- ========================================== -->
    <div id="profileModal" class="fixed inset-0 bg-black/40 hidden z-50 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300">
        
        <!-- Modal Content Box -->
        <div class="bg-[#f5eedc] rounded-[24px] p-10 w-full max-w-[650px] shadow-2xl relative transform scale-95 transition-transform duration-300" id="modalContent">
            
            <div class="flex flex-col gap-5">
                <!-- Field Name -->
                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Name</label>
                    <input type="text" id="modalName" readonly class="w-full bg-[#e3dac9] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2.5 outline-none cursor-not-allowed">
                </div>

                <!-- Field Email -->
                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Email</label>
                    <input type="email" id="modalEmail" readonly class="w-full bg-[#e3dac9] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2.5 outline-none cursor-not-allowed">
                </div>

                <!-- Field Join Membership Sejak -->
                <div>
                    <label class="block text-[#3a2215] text-[15px] font-medium mb-1">Join Membership Sejak</label>
                    <input type="date" id="modalJoin" readonly class="w-full bg-[#e3dac9] border border-[#d6c7ab] text-[#3a2215] rounded-xl px-4 py-2.5 outline-none cursor-not-allowed">
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-center mt-6">
                    <button type="button" onclick="closeModal()" class="bg-[#ff4b4b] hover:bg-[#e64343] text-white px-12 py-3 rounded-2xl font-bold text-[17px] transition-colors shadow-sm w-[180px]">
                        Kembali
                    </button>
                </div>
            </div>

        </div>
    </div>

    <!-- Script Kontrol Pop-up -->
    <script>
        const modal = document.getElementById('profileModal');
        const modalContent = document.getElementById('modalContent');

        // Fungsi Buka Modal & Isi Data Otomatis
        function openModal(nama, email, joinDate) {
            modal.classList.remove('hidden');
            
            // Animasi kecil biar munculnya smooth
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            // Isi inputan otomatis berdasarkan card yang diklik
            document.getElementById('modalName').value = nama;
            document.getElementById('modalEmail').value = email;
            document.getElementById('modalJoin').value = joinDate;
        }

        // Fungsi Tutup Modal
        function closeModal() {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200); // Tunggu animasi selesai baru di-hide
        }

        // Tutup modal kalau user klik di area luar (background gelap)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    </script>
</body>
</html>