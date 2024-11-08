const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Topup = require('../models/Topup');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'wallets',
          localField: '_id',
          foreignField: 'userId',
          as: 'wallet'
        }
      },
      {
        $unwind: {
          path: '$wallet',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          fullname: 1,
          mobile: 1,
          email: 1,
          balance: { $ifNull: ['$wallet.balance', 0] }
        }
      }
    ]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    await Topup.deleteMany({ user: id });
    await Wallet.findOneAndDelete({ userId: id });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
