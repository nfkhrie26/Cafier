<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengeluaran dan Pemasukan - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800">

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
        
        <!-- Navigation Pills Utama -->
        <div class="flex justify-center mb-8">
            <div class="bg-[#a88669] rounded-full flex items-center p-1 shadow-sm overflow-hidden">
                <a href="{{ route('dashboard') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Home</a>
                <a href="{{ route('menu.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Menu</a>
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                <a href="{{ route('karyawan.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Karyawan</a>
                
                <!-- Pengeluaran Dan Pemasukan AKTIF -->
                <a href="#" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <!-- Navigation Pills Sekunder (Tab Buttons) -->
        <div class="flex justify-center mb-10">
            <div class="bg-[#a88669] rounded-xl flex items-center p-1 shadow-sm overflow-hidden" id="tab-container">
                <button onclick="switchTab('top')" id="btn-top" class="text-white px-8 py-2 rounded-lg text-sm font-medium bg-[#4a3424] transition-colors">Top Penjualan</button>
                <button onclick="switchTab('pemasukan')" id="btn-pemasukan" class="text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pemasukan</button>
                <button onclick="switchTab('pengeluaran')" id="btn-pengeluaran" class="text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran</button>
            </div>
        </div>

        <!-- ========================================== -->
        <!-- AREA DATA DUMMY PHP                        -->
        <!-- ========================================== -->
        @php
            $topSales = [
                ['rank' => 1, 'nama' => 'Iced Matcha', 'jumlah' => '120 Cups', 'harga' => 'Rp 40.000', 'gambar' => 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=150&q=80'],
                ['rank' => 2, 'nama' => 'Hot Latte', 'jumlah' => '100 Cups', 'harga' => 'Rp 40.000', 'gambar' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=150&q=80'],
                ['rank' => 3, 'nama' => 'Strawberry Mochi', 'jumlah' => '90 Pcs', 'harga' => 'Rp 40.000', 'gambar' => 'https://images.unsplash.com/photo-1620601614275-f3f8d2cc950a?w=150&q=80'],
                ['rank' => 4, 'nama' => 'Strawberry Drink', 'jumlah' => '80 Cups', 'harga' => 'Rp 40.000', 'gambar' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&q=80'],
                ['rank' => 5, 'nama' => 'Cheesecake', 'jumlah' => '50 Pcs', 'harga' => 'Rp 40.000', 'gambar' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=150&q=80'],
            ];

            $pemasukans = [
                ['nama' => 'Mamat', 'tanggal' => '12-10-2025', 'waktu' => '10:10', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
                ['nama' => 'Cila', 'tanggal' => '12-10-2025', 'waktu' => '10:15', 'metode' => 'Master Card', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
                ['nama' => 'Adawong', 'tanggal' => '12-10-2025', 'waktu' => '10:20', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
                ['nama' => 'Michelle', 'tanggal' => '12-10-2025', 'waktu' => '10:17', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
                ['nama' => 'Angel', 'tanggal' => '12-10-2025', 'waktu' => '10:18', 'metode' => 'Master Card', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
                ['nama' => 'Leon', 'tanggal' => '12-10-2025', 'waktu' => '10:20', 'metode' => 'Master Card', 'nominal' => 'RP125.000', 'status' => 'Pending'],
                ['nama' => 'Zaka', 'tanggal' => '12-10-2025', 'waktu' => '10:25', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Pending'],
            ];

            $pengeluarans = [
                ['nama' => 'Kopi Arabica', 'tanggal' => '12-9-2025', 'waktu' => '10:10', 'metode' => 'Qris', 'nominal' => 'RP5.000.000', 'kategori' => 'Oprasional'],
                ['nama' => 'Gaji Barista', 'tanggal' => '30-8-2025', 'waktu' => '10:15', 'metode' => 'Transfer', 'nominal' => 'RP12.500.000', 'kategori' => 'Berhasil'],
                ['nama' => 'Perbaikan Mesin berkala', 'tanggal' => '20-8-2025', 'waktu' => '10:20', 'metode' => 'Qris', 'nominal' => 'RP 2.500.000', 'kategori' => 'Berhasil'],
                ['nama' => 'Pembelian alat kebersihan', 'tanggal' => '15-8-2025', 'waktu' => '10:17', 'metode' => 'Qris', 'nominal' => 'RP 125.000', 'kategori' => 'Berhasil'],
                ['nama' => 'Matcha', 'tanggal' => '12-8-2025', 'waktu' => '10:18', 'metode' => 'Transfer', 'nominal' => 'RP 1.200.000', 'kategori' => 'Berhasil'],
                ['nama' => 'Creamer', 'tanggal' => '30-7-2025', 'waktu' => '10:20', 'metode' => 'Transfer', 'nominal' => 'RP 1.000.000', 'kategori' => 'Pending'],
                ['nama' => 'Susu', 'tanggal' => '30-7-2025', 'waktu' => '10:25', 'metode' => 'Qris', 'nominal' => 'Rp 1.000.000', 'kategori' => 'Pending'],
            ];
        @endphp

        <!-- ========================================== -->
        <!-- TAB 1: TOP PENJUALAN                       -->
        <!-- ========================================== -->
        <div id="content-top">
            <h2 class="text-center text-[26px] font-bold text-[#3a2215] mb-6">TOP Penjualan Bulan Ini</h2>
            
            <div class="bg-[#f5eedc] max-w-[900px] mx-auto shadow-sm overflow-hidden text-[#3a2215]">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-[#e3d5c1]">
                            <th class="py-4 px-8 font-medium w-[15%]">Nomor</th>
                            <th class="py-4 px-8 font-medium w-[30%]">Produk</th>
                            <th class="py-4 px-8 font-medium w-[30%]">Jumlah Penjualan</th>
                            <th class="py-4 px-8 font-medium w-[25%]">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($topSales as $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none">
                                <td class="py-3 px-8">
                                    @php
                                        $rankStyle = 'bg-[#f0e4cc] text-[#3a2215]'; 
                                        if ($item['rank'] == 1) $rankStyle = 'bg-[#3d2a1d] text-white shadow-md';
                                        elseif ($item['rank'] == 2) $rankStyle = 'bg-gradient-to-b from-[#d58b43] to-[#b3691d] text-white shadow-md';
                                        elseif ($item['rank'] == 3) $rankStyle = 'bg-gradient-to-b from-[#e1d5c5] to-[#bea995] text-[#3a2215] shadow-md';
                                    @endphp
                                    <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold {{ $rankStyle }}">
                                        {{ $item['rank'] }}
                                    </div>
                                </td>
                                <td class="py-3 px-8">
                                    <div class="w-16 h-16 bg-white rounded-full overflow-hidden shadow-sm flex items-center justify-center p-1">
                                        <img src="{{ $item['gambar'] }}" alt="{{ $item['nama'] }}" class="w-full h-full object-cover rounded-full">
                                    </div>
                                </td>
                                <td class="py-3 px-8 font-bold text-[15px]">{{ $item['jumlah'] }}</td>
                                <td class="py-3 px-8 font-bold text-[15px]">{{ $item['harga'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <!-- Pagination -->
                <div class="flex justify-end items-center gap-4 py-4 px-8 border-t border-[#e3d5c1]">
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">1</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">2</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">3</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg></button>
                </div>
            </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 2: PEMASUKAN                           -->
        <!-- ========================================== -->
        <div id="content-pemasukan" class="hidden">
            <h2 class="text-center text-[22px] font-bold text-[#3a2215] mb-6">Riwayat Transaksi Pemasukan</h2>
            
            <div class="bg-[#f5eedc] w-full shadow-sm overflow-hidden text-[#3a2215]">
                <table class="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr class="border-b border-[#e3d5c1] bg-[#ece2cd]">
                            <th class="py-4 px-6 font-semibold">Nama Pelanggan</th>
                            <th class="py-4 px-6 font-semibold">Tanggal</th>
                            <th class="py-4 px-6 font-semibold">Pukul</th>
                            <th class="py-4 px-6 font-semibold">Metode<br>Pembayaran</th>
                            <th class="py-4 px-6 font-semibold">Nominal</th>
                            <th class="py-4 px-6 font-semibold">Status</th>
                            <th class="py-4 px-6 font-semibold text-center">Rincian</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pemasukans as $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none hover:bg-[#ece2cd] transition-colors">
                                <td class="py-4 px-6 font-medium">{{ $item['nama'] }}</td>
                                <td class="py-4 px-6">{{ $item['tanggal'] }}</td>
                                <td class="py-4 px-6">{{ $item['waktu'] }}</td>
                                <td class="py-4 px-6">{{ $item['metode'] }}</td>
                                <td class="py-4 px-6 font-medium text-[#2bd965]">{{ $item['nominal'] }}</td>
                                <td class="py-4 px-6 font-medium {{ $item['status'] == 'Berhasil' ? 'text-[#2bd965]' : 'text-[#ffcc00]' }}">
                                    {{ $item['status'] }}
                                </td>
                                <td class="py-4 px-6 text-center">
                                    <button class="bg-[#cd833c] hover:bg-[#a86934] text-white text-xs px-4 py-1.5 rounded-full transition-colors">Rincian</button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <!-- Pagination (Reused) -->
                <div class="flex justify-end items-center gap-4 py-4 px-8 border-t border-[#e3d5c1]">
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">1</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">2</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">3</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg></button>
                </div>
            </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 3: PENGELUARAN                         -->
        <!-- ========================================== -->
        <div id="content-pengeluaran" class="hidden">
            <!-- Tombol Tambah Pengeluaran -->
            <div class="flex justify-center mb-8">
                <button class="bg-[#cd833c] text-white px-12 py-3 rounded-xl font-medium text-[20px] hover:bg-[#a86934] transition-colors shadow-sm">
                    Tambah Pengeluaran
                </button>
            </div>

            <h2 class="text-center text-[22px] font-bold text-[#3a2215] mb-6">Riwayat Transaksi Pengeluaran</h2>
            
            <div class="bg-[#f5eedc] w-full shadow-sm overflow-hidden text-[#3a2215]">
                <table class="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr class="border-b border-[#e3d5c1] bg-[#ece2cd]">
                            <th class="py-4 px-6 font-semibold">Nama Pengeluaran</th>
                            <th class="py-4 px-6 font-semibold">Tanggal</th>
                            <th class="py-4 px-6 font-semibold">Pukul</th>
                            <th class="py-4 px-6 font-semibold">Metode<br>Pembayaran</th>
                            <th class="py-4 px-6 font-semibold">Nominal</th>
                            <th class="py-4 px-6 font-semibold">Kategori</th>
                            <th class="py-4 px-6 font-semibold text-center">Rincian</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pengeluarans as $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none hover:bg-[#ece2cd] transition-colors">
                                <td class="py-4 px-6 font-medium">{{ $item['nama'] }}</td>
                                <td class="py-4 px-6">{{ $item['tanggal'] }}</td>
                                <td class="py-4 px-6">{{ $item['waktu'] }}</td>
                                <td class="py-4 px-6">{{ $item['metode'] }}</td>
                                <td class="py-4 px-6 font-medium text-[#2bd965]">{{ $item['nominal'] }}</td>
                                <!-- Warna disesuaikan dengan nilai Kategori/Status -->
                                <td class="py-4 px-6 font-medium {{ ($item['kategori'] == 'Berhasil' || $item['kategori'] == 'Oprasional') ? 'text-[#2bd965]' : 'text-[#ffcc00]' }}">
                                    {{ $item['kategori'] }}
                                </td>
                                <td class="py-4 px-6 text-center">
                                    <button class="bg-[#cd833c] hover:bg-[#a86934] text-white text-xs px-4 py-1.5 rounded-full transition-colors">Rincian</button>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <!-- Pagination (Reused) -->
                <div class="flex justify-end items-center gap-4 py-4 px-8 border-t border-[#e3d5c1]">
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">1</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">2</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors">3</button>
                    <button class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg></button>
                </div>
            </div>
        </div>

    </main>

    <!-- Script Tab Switcher -->
    <script>
        function switchTab(tabName) {
            // 1. Ambil semua tombol dan konten
            const btnTop = document.getElementById('btn-top');
            const btnPemasukan = document.getElementById('btn-pemasukan');
            const btnPengeluaran = document.getElementById('btn-pengeluaran');
            
            const contentTop = document.getElementById('content-top');
            const contentPemasukan = document.getElementById('content-pemasukan');
            const contentPengeluaran = document.getElementById('content-pengeluaran');

            // 2. Reset semua tombol ke style "tidak aktif" (cokelat muda)
            const inactiveClass = ['hover:bg-[#8e6e53]', 'bg-transparent'];
            const activeClass = 'bg-[#4a3424]';

            [btnTop, btnPemasukan, btnPengeluaran].forEach(btn => {
                btn.classList.remove(activeClass);
                btn.classList.add('hover:bg-[#8e6e53]');
            });

            // 3. Sembunyikan semua konten tabel
            contentTop.classList.add('hidden');
            contentPemasukan.classList.add('hidden');
            contentPengeluaran.classList.add('hidden');

            // 4. Aktifkan tombol dan konten yang dipilih
            if (tabName === 'top') {
                btnTop.classList.add(activeClass);
                btnTop.classList.remove('hover:bg-[#8e6e53]');
                contentTop.classList.remove('hidden');
            } else if (tabName === 'pemasukan') {
                btnPemasukan.classList.add(activeClass);
                btnPemasukan.classList.remove('hover:bg-[#8e6e53]');
                contentPemasukan.classList.remove('hidden');
            } else if (tabName === 'pengeluaran') {
                btnPengeluaran.classList.add(activeClass);
                btnPengeluaran.classList.remove('hover:bg-[#8e6e53]');
                contentPengeluaran.classList.remove('hidden');
            }
        }
    </script>
</body>
</html>