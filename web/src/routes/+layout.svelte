<script lang="ts">
	import '../app.postcss';
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import type { Analytics } from 'firebase/analytics';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { getDatabase } from 'firebase/database';
	import { getStorage } from 'firebase/storage';

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyAK8TjX2xfHznSKurF8v-vJkc4m3qvLX1M',
		authDomain: 'morgan-s-tools.firebaseapp.com',
		projectId: 'morgan-s-tools',
		storageBucket: 'morgan-s-tools.appspot.com',
		messagingSenderId: '229257882277',
		appId: '1:229257882277:web:2f63caa27ebd248849fb4c',
		measurementId: 'G-3HTHYLK8NN'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = {} as Analytics;
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	const rtdb = getDatabase(app);
	const storage = getStorage(app);
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>mc.mogdan.xyz</title>
</svelte:head>

<FirebaseApp {storage} {rtdb} {analytics} {firestore} {auth}>
	<body class="container mx-auto py-5 bg-surface-50 dark:bg-surface-900 light">
		<slot />
	</body>
</FirebaseApp>
