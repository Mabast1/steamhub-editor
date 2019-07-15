import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../../../firebase';

export default withFirebase(props => {
  function handleSubmit() {
    const cogName = document.getElementById('cog-name');
    const moduleNum = document.getElementById('module-num');
    const modulePic = document.getElementById('module-pic');
    const moduleName = document.getElementById('module-name');
    const moduleDesc = document.getElementById('module-desc');
    let standards = [];
    for (let i = 0; i < 1000; i++) {
      const stdCode = document.getElementById(`std-code-${i}`);
      const stdDesc = document.getElementById(`std-desc-${i}`);

      if (stdCode && stdDesc) {
        if (stdCode.value !== '' && stdDesc.value !== '')
          standards.push({ stdCode: stdCode.value, stdDesc: stdDesc.value });
      } else {
        break;
      }
    }
    let vocabs = [];
    for (let i = 0; i < 1000; i++) {
      const vocab = document.getElementById(`vocab-${i}`);
      const vocabDef = document.getElementById(`vocab-definition-${i}`);

      if (vocab && vocabDef) {
        if (vocab.value !== '' && vocabDef.value !== '')
          vocabs.push({ vocab: vocab.value, vocabDef: vocabDef.value });
      } else {
        break;
      }
    }
    let matTeacher = [];
    for (let i = 0; i < 1000; i++) {
      const teacherItem = document.getElementById(`teacher-item-${i}`);
      const teacherQuantity = document.getElementById(`teacher-quantity-${i}`);
      const teacherNote = document.getElementById(`teacher-notes-${i}`);

      if (teacherItem && teacherQuantity && teacherNote) {
        if (teacherItem.value !== '' && teacherQuantity.value !== '')
          matTeacher.push({
            teacherItem: teacherItem.value,
            teacherQuantity: teacherQuantity.value,
            teacherNote: teacherNote.value
          });
      } else {
        break;
      }
    }
    let matStudent = [];
    for (let i = 0; i < 1000; i++) {
      const studentItem = document.getElementById(`student-item-${i}`);
      const studentQuantity = document.getElementById(`student-quantity-${i}`);
      const studentNote = document.getElementById(`student-notes-${i}`);

      if (studentItem && studentQuantity && studentNote) {
        if (studentItem.value !== '' && studentQuantity.value !== '')
          matStudent.push({
            studentItem: studentItem.value,
            studentQuantity: studentQuantity.value,
            studentNote: studentNote.value
          });
      } else {
        break;
      }
    }
    let matGroup = [];
    for (let i = 0; i < 1000; i++) {
      const groupItem = document.getElementById(`group-item-${i}`);
      const groupQuantity = document.getElementById(`group-quantity-${i}`);
      const groupNote = document.getElementById(`group-notes-${i}`);

      if (groupItem && groupQuantity && groupNote) {
        if (groupItem.value !== '' && groupQuantity.value !== '')
          matGroup.push({
            groupItem: groupItem.value,
            groupQuantity: groupQuantity.value,
            groupNote: groupNote.value
          });
      } else {
        break;
      }
    }
    const engage = document.getElementById('engage');
    const engagePic = document.getElementById('engage-pic');
    let steps = [];
    for (let i = 0; i < 1000; i++) {
      const step = document.getElementById(`step-${i}`);
      const stepAsk = document.getElementById(`step-ask-${i}`);
      const stepPic = document.getElementById(`step-pic-${i}`);

      if (step && stepAsk && stepPic) {
        if (step.value !== '')
          steps.push({
            step: step.value,
            stepAsk: stepAsk.value,
            stepPic: stepPic.value
          });
      } else {
        break;
      }
    }
    const explain = document.getElementById('explain');
    const explainPic = document.getElementById('explain-pic');
    const elaborate = document.getElementById('elaborate');
    const elaboratePic = document.getElementById('elaborate-pic');
    let questions = [];
    for (let i = 1; i <= 1000; i++) {
      const question = document.getElementById(`question-${i}`);
      const optionA = document.getElementById(`question-${i}-option-A`);
      const optionB = document.getElementById(`question-${i}-option-B`);
      const optionC = document.getElementById(`question-${i}-option-C`);
      const optionD = document.getElementById(`question-${i}-option-D`);
      const answer = document.getElementById(`answer-${i}`);

      if (question && optionA && optionB && optionC && optionD && answer) {
        if (
          question.value !== '' &&
          optionA.value !== '' &&
          optionB.value !== '' &&
          optionC.value !== '' &&
          optionD.value !== '' &&
          answer.innerText !== ''
        )
          questions.push({
            question: question.value,
            optionA: optionA.value,
            optionB: optionB.value,
            optionC: optionC.value,
            optionD: optionD.value,
            answer: answer.innerText
          });
      } else {
        break;
      }
    }
    const prepNotes = document.getElementById('prep-notes');

    if (
      cogName.value !== '' &&
      moduleNum.value > 0 &&
      modulePic.value !== '' &&
      moduleName.value !== '' &&
      moduleDesc.value !== '' &&
      standards.length > 0 &&
      vocabs.length > 0 &&
      (matTeacher.length > 0 || matStudent.length > 0 || matGroup.length > 0) &&
      prepNotes.value !== '' &&
      engage.value !== '' &&
      steps.length > 0 &&
      explain.value !== '' &&
      elaborate.value !== '' &&
      questions.length > 0
    ) {
      props.firebase.modules().add({
        cogname: cogName.value,
        module_number: moduleNum.value,
        cover: modulePic.value,
        module: moduleName.value,
        overview: moduleDesc.value,
        standards,
        vocab: vocabs,
        material_teacher: matTeacher,
        material_student: matStudent,
        material_group: matGroup,
        prep: prepNotes.value,
        engage: { text: engage.value, pic: engagePic.value },
        steps,
        explain: { text: explain.value, pic: explainPic.value },
        elaborate: { text: elaborate.value, pic: elaboratePic.value },
        evaluate: questions
      });
      props.handlePublished(true);
    } else {
      props.handlePublished(false);
    }

    props.handleClick();
  }

  return (
    <Button
      component='label'
      variant='contained'
      style={{ marginTop: '60px' }}
      onClick={handleSubmit}
    >
      PUBLISH CLASS
    </Button>
  );
});
