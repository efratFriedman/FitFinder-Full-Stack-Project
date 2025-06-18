import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/API';
import './BmiBar.css'
const BmiBar = () => {
  const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);
  const bmiValue = trainee?.bmi ? trainee?.bmi : 0;

  const [category, setCategory] = useState<string>('');

  const calculateBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal';
    if (bmiValue < 30) return 'Pre-obesity';
    if (bmiValue < 35) return 'Obese I';
    if (bmiValue < 40) return 'Obese II';
    return 'Obese III';
  };

  useEffect(() => {
    const calculatedCategory = calculateBmiCategory(bmiValue);
    setCategory(calculatedCategory);

  }, [bmiValue]);

  return (
    <div className="c-bmi">
      <div className="c-bmi__result">
        Your BMI Is: <output name="r">{bmiValue}</output>
      </div>
      <div className="c-bmi__groups">
        {['Underweight', 'Normal', 'Pre-obesity', 'Obese I', 'Obese II', 'Obese III'].map((label, index) => (
          <div key={index} className={`c-bmi__group ${category === label ? 'active' : ''}`}>
            <input type="radio" id={`bmi-g${index}`} name="g" checked={category === label} readOnly />
            <label htmlFor={`bmi-g${index}`}>{label}</label>
          </div>

        ))}

      </div>

    </div>
  );
};

export default BmiBar;
