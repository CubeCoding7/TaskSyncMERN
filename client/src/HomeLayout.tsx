import { Outlet } from 'react-router-dom';
import HomeHeader from './components/navigation/HomeHeader';
import { parseColor, rgbToRgb } from './lib/colorUtils';

function HomeLayout() {

                document.documentElement.style.setProperty(
                        '--first-color',
                        '0, 4, 255'
                );
                const colorStr = '0, 4, 255';
                const opacity = 0.6;
                const { r, g, b } = parseColor(colorStr);
                document.documentElement.style.setProperty(
                        '--header-color',
                        rgbaToRgb(r, g, b, opacity)
                );
                document.documentElement.style.setProperty(
                        '--second-color',
                         '0, 199, 123'
                );

	return (
		<div className="App">
			<HomeHeader />
			<div style={{ marginTop: '60px' }}>
				<Outlet />
			</div>
		</div>
	);
}

export default HomeLayout;
