/*Algo
We could first create an accumulative list of revenues O(N).
Then use binary search to find items in the list O(log(N)).
We also need to loop on every elements in the milestones O(M).
The time complexity for the entire solution would be O(N)+O(log(N))+O(M) = O(M*N*log(N)).// Add We could
*/



//my soln:

function getMilestoneDays(revenues, milestones) {

  function findDay_BruteForce(revenue){    //finding accumulative list of revenues
        for( let i=0; i<revenues.length; i++ ){
            if( revenues[i] >= revenue ){
                return i+1;
            }
        }
        return -1;
    }

    // Binary search
    function findDay(revenue){   //to find items in the list
        let left = 0;
        let right = revenues.length;
        // Binary search
        while( left<right ){
            let middle = left + Math.floor( (right-left)/2 );
            if( revenue < revenues[middle] ){
                right = middle; 
            } else {
                left = middle;
            }
            if( (right-left) == 1 ){
                return revenue==revenues[left] ? right: right+1;
            }
        }
        return -1;
    }

    let totalRevenue = 0;
    let result = new Array();
    // Revenues accumulation 
    for(let i=0; i<revenues.length; i++ ){
        totalRevenue += revenues[i];
        revenues[i] = totalRevenue;
    }

    for(const milestone of milestones){
        let day = findDay(milestone);

        result.push(day);
    }
    return result;
  }










//Facebook's testcases

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom.
function printintegerArray(array) {
  var size = array.length;
  var res = '';
  res += '[';
  var i = 0;
  for (i = 0; i < size; i++) {
    if (i !== 0) {
      res += ', ';
    }
    res += array[i];
  }
  res += ']';
  return res;
}

var test_case_number = 1;

function check(expected, output) {
  var expected_size = expected.length;
  var output_size = output.length;
  var result = true;
  if (expected_size != output_size) {
    result = false;
  }
  for (var i = 0; i < Math.min(expected_size, output_size); i++) {
    result &= (output[i] == expected[i]);
  }
  var rightTick = "\u2713";
  var wrongTick = "\u2717";
  if (result) {
    var out = rightTick + ' Test #' + test_case_number;
    console.log(out);
  }
  else {
    var out = '';
    out += wrongTick + ' Test #' + test_case_number + ': Expected ';
    out += printintegerArray(expected);
    out += ' Your output: ';
    out += printintegerArray(output);
    console.log(out);
  }
  test_case_number++;
}

var revenues_1 = [100, 200, 300, 400, 500];
var milestones_1 = [300, 800, 1000, 1400]
var expected_1 = [2, 4, 4, 5];
var output_1 = getMilestoneDays(revenues_1, milestones_1);
check(expected_1, output_1);

var revenues_2 = [700, 800, 600, 400, 600, 700];
var milestones_2 = [3100, 2200, 800, 2100, 1000];
var expected_2 = [5, 4, 2, 3, 2];
var output_2 = getMilestoneDays(revenues_2, milestones_2);
check(expected_2, output_2);


