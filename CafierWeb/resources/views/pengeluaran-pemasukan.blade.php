<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengeluaran dan Pemasukan - Serene</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="m-0 p-0 bg-[#e3dac9] font-sans min-h-screen text-gray-800">

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

    <main class="max-w-[1100px] mx-auto pt-10 pb-12 px-6">
        
        <div class="flex justify-center mb-8">
            <div class="bg-[#a88669] rounded-full flex items-center p-1 shadow-sm overflow-hidden">
                <a href="{{ route('dashboard') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Home</a>
                <a href="{{ route('menu.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Menu</a>
                <a href="{{ route('membership.index') }}" class="text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8e6e53] transition-colors">Daftar Membership</a>
                <a href="{{ route('keuangan.index') }}" class="bg-[#3d2a1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">Pengeluaran Dan Pemasukan</a>
            </div>
        </div>

        <div class="flex justify-center mb-10">
            <div class="bg-[#a88669] rounded-xl flex items-center p-1 shadow-sm overflow-hidden" id="tab-container">
                <button onclick="switchTab('top')" id="btn-top" class="text-white px-8 py-2 rounded-lg text-sm font-medium bg-[#4a3424] transition-colors">Top Penjualan</button>
                <button onclick="switchTab('pemasukan')" id="btn-pemasukan" class="text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pemasukan</button>
                <button onclick="switchTab('pengeluaran')" id="btn-pengeluaran" class="text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#8e6e53] transition-colors">Pengeluaran</button>
            </div>
        </div>

        <div id="content-top">
            @php
                $mReq = request('month', date('m'));
                $yReq = request('year', date('Y'));
                $monthName = date('F', mktime(0, 0, 0, $mReq, 1));
            @endphp
            
            <div class="flex justify-between items-center mb-6 max-w-[900px] mx-auto">
                <h2 class="text-[26px] font-bold text-[#3a2215] m-0">Top Penjualan {{ $monthName }} {{ $yReq }}</h2>
                
                <form method="GET" action="{{ route('keuangan.index') }}" class="flex gap-3 m-0">
                    <div class="relative">
                        <select name="month" onchange="this.form.submit()" class="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-[#d6c7ab] bg-[#f5eedc] text-[#3a2215] focus:outline-none cursor-pointer">
                            @for($m=1; $m<=12; $m++)
                                <option value="{{ sprintf('%02d', $m) }}" {{ $mReq == sprintf('%02d', $m) ? 'selected' : '' }}>
                                    {{ date('F', mktime(0, 0, 0, $m, 1)) }}
                                </option>
                            @endfor
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#3a2215]">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <select name="year" onchange="this.form.submit()" class="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-[#d6c7ab] bg-[#f5eedc] text-[#3a2215] focus:outline-none cursor-pointer">
                            @for($y=date('Y'); $y>=2020; $y--)
                                <option value="{{ $y }}" {{ $yReq == $y ? 'selected' : '' }}>{{ $y }}</option>
                            @endfor
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#3a2215]">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </form>
            </div>
            
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
                        @foreach($topProducts as $index => $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none top-sales-row" style="display: none;">
                                <td class="py-3 px-8">
                                    @php
                                        $rank = $index + 1;
                                        $rankStyle = 'bg-[#f0e4cc] text-[#3a2215]'; 
                                        if ($rank == 1) $rankStyle = 'bg-[#3d2a1d] text-white shadow-md';
                                        elseif ($rank == 2) $rankStyle = 'bg-gradient-to-b from-[#d58b43] to-[#b3691d] text-white shadow-md';
                                        elseif ($rank == 3) $rankStyle = 'bg-gradient-to-b from-[#e1d5c5] to-[#bea995] text-[#3a2215] shadow-md';
                                    @endphp
                                    <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold {{ $rankStyle }}">
                                        {{ $rank }}
                                    </div>
                                </td>
                                <td class="py-3 px-8 flex items-center gap-4">
                                    <div class="w-16 h-16 bg-white rounded-full overflow-hidden shadow-sm flex items-center justify-center p-1 flex-shrink-0">
                                        <img src="{{ !empty($item['image']) ? env('CAFIER_API_STORAGE_URL') . '/' . $item['image'] : 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop' }}" 
                                             alt="{{ $item['name'] }}" 
                                             class="w-full h-full object-cover rounded-full"
                                             onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop';">
                                    </div>
                                    <span class="font-bold text-[16px] text-[#3a2215]">{{ $item['name'] }}</span>
                                </td>
                                <td class="py-3 px-8 font-bold text-[15px]">
                                    {{ $item['total_sold'] ?? 0 }} {{ ($item['category_id'] ?? 1) == 1 ? 'Cups' : 'Pcs' }}
                                </td>
                                <td class="py-3 px-8 font-bold text-[15px]">
                                    Rp {{ number_format($item['price'] ?? 0, 0, ',', '.') }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                
                <div id="pagination-container" class="flex justify-end items-center gap-4 py-4 px-8 border-t border-[#e3d5c1]">
                </div>
            </div>
        </div>

        <div id="content-pemasukan" class="hidden">
            <h2 class="text-center text-[22px] font-bold text-[#3a2215] mb-6">Riwayat Transaksi Pemasukan</h2>
            <div class="bg-[#f5eedc] w-full shadow-sm overflow-hidden text-[#3a2215]">
                <table class="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr class="border-b border-[#e3d5c1] bg-[#ece2cd]">
                            <th class="py-4 px-6 font-semibold">Nama Pelanggan</th>
                            <th class="py-4 px-6 font-semibold">Tanggal</th>
                            <th class="py-4 px-6 font-semibold">Pukul</th>
                            <th class="py-4 px-6 font-semibold">Metode</th>
                            <th class="py-4 px-6 font-semibold">Nominal</th>
                            <th class="py-4 px-6 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pemasukans as $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none hover:bg-[#ece2cd]">
                                <td class="py-4 px-6 font-medium">{{ $item['nama'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['tanggal'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['waktu'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['metode'] ?? '-' }}</td>
                                <td class="py-4 px-6 font-medium text-[#2bd965]">{{ $item['nominal'] ?? '-' }}</td>
                                <td class="py-4 px-6 font-medium text-[#2bd965]">{{ $item['status'] ?? '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div id="content-pengeluaran" class="hidden">
            <div class="flex justify-between items-center mb-6 w-full max-w-[900px] mx-auto">
                <h2 class="text-[22px] font-bold text-[#3a2215] m-0">Riwayat Transaksi Pengeluaran</h2>
                <button onclick="openExpenseModal()" class="bg-[#ff4b4b] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#e64343] transition-colors shadow-sm">
                    + Tambah Pengeluaran
                </button>
            </div>
            
            @if($errors->any())
                <div class="mb-4 max-w-[900px] mx-auto p-4 bg-red-100 text-red-700 rounded-xl font-bold text-center">{{ $errors->first() }}</div>
            @endif

            <div class="bg-[#f5eedc] w-full shadow-sm overflow-hidden text-[#3a2215]">
                <table class="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr class="border-b border-[#e3d5c1] bg-[#ece2cd]">
                            <th class="py-4 px-6 font-semibold">Nama Pengeluaran</th>
                            <th class="py-4 px-6 font-semibold">Tanggal</th>
                            <th class="py-4 px-6 font-semibold">Pukul</th>
                            <th class="py-4 px-6 font-semibold">Metode</th>
                            <th class="py-4 px-6 font-semibold">Nominal</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pengeluarans as $item)
                            <tr class="border-b border-[#e3d5c1] last:border-none hover:bg-[#ece2cd]">
                                <td class="py-4 px-6 font-medium">{{ $item['nama'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['tanggal'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['waktu'] ?? '-' }}</td>
                                <td class="py-4 px-6">{{ $item['metode'] ?? '-' }}</td>
                                <td class="py-4 px-6 font-medium text-[#ff4b4b]">{{ $item['nominal'] ?? '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <script>
        function switchTab(tabName) {
            const btnTop = document.getElementById('btn-top');
            const btnPemasukan = document.getElementById('btn-pemasukan');
            const btnPengeluaran = document.getElementById('btn-pengeluaran');
            
            const contentTop = document.getElementById('content-top');
            const contentPemasukan = document.getElementById('content-pemasukan');
            const contentPengeluaran = document.getElementById('content-pengeluaran');

            const inactiveClass = ['hover:bg-[#8e6e53]', 'bg-transparent'];
            const activeClass = 'bg-[#4a3424]';

            [btnTop, btnPemasukan, btnPengeluaran].forEach(btn => {
                btn.classList.remove(activeClass);
                btn.classList.add('hover:bg-[#8e6e53]');
            });

            contentTop.classList.add('hidden');
            contentPemasukan.classList.add('hidden');
            contentPengeluaran.classList.add('hidden');

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

        const rowsPerPage = 7; 
        let currentPage = 1;
        const rows = document.querySelectorAll('.top-sales-row');
        const totalPages = Math.ceil(rows.length / rowsPerPage);

        function displayPage(page) {
            currentPage = page;
            
            rows.forEach((row, index) => {
                if (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) {
                    row.style.display = ''; 
                } else {
                    row.style.display = 'none'; 
                }
            });
            
            renderPaginationUI();
        }

        function renderPaginationUI() {
            const container = document.getElementById('pagination-container');
            
            if (rows.length === 0) {
                container.innerHTML = '';
                return;
            }

            let html = '';
            
            html += `
                <button onclick="changePage(${currentPage - 1})" 
                        class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''}" 
                        ${currentPage === 1 ? 'disabled' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>`;

            let startPage = 1;
            let endPage = totalPages;

            if (totalPages > 3) {
                if (currentPage === 1) {
                    startPage = 1;
                    endPage = 3;
                } else if (currentPage === totalPages) {
                    startPage = totalPages - 2;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 1;
                    endPage = currentPage + 1;
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                let activeClass = i === currentPage ? 'bg-[#e3d5c1]' : '';
                html += `
                <button onclick="displayPage(${i})" 
                        class="w-8 h-8 flex items-center justify-center text-[#3a2215] font-bold hover:bg-[#e3d5c1] rounded-md transition-colors ${activeClass}">
                    ${i}
                </button>`;
            }

            html += `
                <button onclick="changePage(${currentPage + 1})" 
                        class="w-8 h-8 flex items-center justify-center text-[#3a2215] hover:bg-[#e3d5c1] rounded-md transition-colors ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''}" 
                        ${currentPage === totalPages ? 'disabled' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>`;

            container.innerHTML = html;
        }

        function changePage(page) {
            if (page >= 1 && page <= totalPages) {
                displayPage(page);
            }
        }

        if (rows.length > 0) {
            displayPage(1);
        }
    </script>
    
    <!-- MODAL TAMBAH PENGELUARAN -->
    <div id="expenseModal" class="fixed inset-0 bg-black/60 hidden justify-center items-center z-[9999] opacity-0 transition-all duration-300">
        <div id="expenseModalContent" class="bg-[#FDF6E3] p-10 rounded-[30px] w-[90%] max-w-[500px] shadow-2xl relative transform scale-95 transition-transform duration-300">
            
            <form method="POST" action="{{ route('keuangan.storeExpense') }}">
                @csrf
                <h2 class="text-3xl font-bold text-center text-[#3a2215] mb-8">Tambah Pengeluaran</h2>

                <div class="mb-5">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Nama Pengeluaran</label>
                    <input type="text" name="nama" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]" required placeholder="Misal: Beli Kopi">
                </div>

                <div class="mb-5">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Nominal (Rp)</label>
                    <input type="number" name="nominal" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]" required placeholder="Misal: 50000">
                </div>

                <div class="mb-8">
                    <label class="block mb-2 font-medium text-gray-800 ml-2">Metode</label>
                    <select name="metode" class="w-full px-5 py-3.5 rounded-[15px] border border-[#DED1B8] bg-[#EFE1C9] text-gray-700 focus:outline-none focus:border-[#A8926D]" required>
                        <option value="Cash">Cash</option>
                        <option value="Transfer">Transfer</option>
                        <option value="QRIS">QRIS</option>
                    </select>
                </div>

                <div class="flex justify-center gap-6">
                    <button type="button" onclick="closeExpenseModal()" class="bg-[#FF3D3D] hover:bg-[#E03535] text-white py-3 w-[150px] rounded-[15px] font-bold text-[18px] transition-colors">
                        Batal
                    </button>
                    <button type="submit" class="bg-[#00FF00] hover:bg-[#00E000] text-white py-3 w-[150px] rounded-[15px] font-bold text-[18px] transition-colors">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        function openExpenseModal() {
            const modal = document.getElementById('expenseModal');
            const content = document.getElementById('expenseModalContent');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);
        }

        function closeExpenseModal() {
            const modal = document.getElementById('expenseModal');
            const content = document.getElementById('expenseModalContent');
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }, 300);
        }
    </script>
</body>
</html>